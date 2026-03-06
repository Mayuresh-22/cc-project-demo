import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import UserService from "./services/users.js";
import PlantService from "./services/plants.js";
import GeminiService from "./services/GeminiService.js";
import EmailService from "./services/EmailService.js";
import S3Service from "./services/S3Service.js";
import type { Plant, User } from "./types/index.js";

const app = new Hono();

// CORS Middleware
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type"],
  maxAge: 600,
}));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// ── User routes ────────────────────────────────────────────────────────────────

app.get("/user", async (c) => {
  const uid = c.req.query("uid");
  if (!uid) {
    return c.text("Missing uid param", 400);
  }
  const userData = await new UserService().getUser(uid);
  return c.json(userData);
});

app.post("/user", async (c) => {
  const userData = (await c.req.json()) as User;
  const newUser = await new UserService().createUser(userData);
  return c.json(newUser);
});

// ── Plant routes ───────────────────────────────────────────────────────────────

app.get("/plants", async (c) => {
  const uid = c.req.query("uid");
  if (!uid) {
    return c.text("Missing uid param", 400);
  }
  const plants = await new PlantService().getUserPlants(uid);
  console.log("Fetched plants for user:", plants);
  if (!plants) {
    return c.text("No plants found for this user", 404);
  }
  const s3Service = new S3Service();
  const plantsWithUrls = await Promise.all(
    plants.map(async (plant: any) => ({
      ...plant,
      image_url: plant.image_url ? await s3Service.getPresignedUrl(plant.image_url) : null,
    }))
  );
  return c.json(plantsWithUrls);
});

app.get("/plants/:id", async (c) => {
  const plantId = c.req.param("id");
  if (!plantId) {
    return c.text("Missing plant ID", 400);
  }
  try {
    const plant = await new PlantService().getPlantById(plantId);
    const s3Service = new S3Service();
    if (plant.image_url) {
      plant.image_url = await s3Service.getPresignedUrl(plant.image_url);
    }
    return c.json(plant);
  } catch (error) {
    console.error("Error fetching plant details:", error);
    return c.text("Error fetching plant details", 500);
  }
});

app.post("/plants", async (c) => {
  const formData = await c.req.parseBody();
  const plantData: Plant = {
    user_id: formData.user_id as string,
    plant_name: formData.plant_name as string,
    nickname: formData.nickname as string,
    plant_type: formData.plant_type as string,
    species: formData.species as string,
    image_url: "",
    location_in_home: formData.location_in_home as string,
    pot_size: formData.pot_size as string,
    acquisition_date: formData.acquisition_date as string,
    last_watered: formData.last_watered as string,
    sunlight_exposure: formData.sunlight_exposure as string,
    soil_type: formData.soil_type as string,
    health_status: formData.health_status as string,
    care_recommendations: "",
  };
  const imageFile = formData.image as File | Blob;

  if (!plantData.user_id || !imageFile) {
    return c.text("Missing plant data or image file", 400);
  }

  try {
    // Upload image to S3 — store the key, not the full URL
    const s3Service = new S3Service();
    const imageKey = await s3Service.uploadImage(imageFile, `${plantData.user_id}/${plantData.plant_name}`);
    plantData.image_url = imageKey;
    const imageUrl = imageKey;

    // Generate care recommendations
    const geminiService = new GeminiService();
    const careRecommendations = await geminiService.getCareRecommendations(plantData, imageFile);
    // Serialize to string for DB storage
    plantData.care_recommendations = JSON.stringify(careRecommendations);

    const newPlant = await new PlantService().createPlant(plantData, imageUrl);
    if (!newPlant) {
      return c.text("Failed to create plant", 500);
    }

    // Send email to user with care recommendations
    const emailService = new EmailService();
    const user = await new UserService().getUser(plantData.user_id);
    const userEmail = user.email;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <header style="background-color: #4CAF50; color: white; padding: 10px; text-align: center;">
          <h1>GreenGuardian</h1>
        </header>
        <main style="padding: 20px;">
          <h2>Plant Care Recommendations</h2>
          <p><strong>Plant Name:</strong> ${plantData.plant_name}</p>
          <p><strong>Nickname:</strong> ${plantData.nickname || "N/A"}</p>
          <p><strong>Care Recommendations:</strong> ${careRecommendations.recommendation}</p>
          <p><strong>Fertilizers:</strong> ${careRecommendations.fertilizers.join(", ")}</p>
          <p><strong>Precautions:</strong> ${careRecommendations.precautions.join(", ")}</p>
          <p><strong>Water Frequency:</strong> Every ${careRecommendations.water_frequency} days</p>
        </main>
        <footer style="background-color: #f1f1f1; color: #555; text-align: center; padding: 10px; margin-top: 20px;">
          <p>Thank you for using GreenGuardian!</p>
          <p style="font-size: 12px;">Made with ❤️ by the GreenGuardian Team</p>
        </footer>
      </div>
    `;
    await emailService.sendEmail(userEmail, "Your Plant Care Recommendations", emailContent);

    return c.json({
      message: "Plant created successfully",
      plant: newPlant,
    });
  } catch (error) {
    console.error("Error processing plant data:", error);
    return c.text("Failed to process plant data", 500);
  }
});

// ── Chat route ─────────────────────────────────────────────────────────────────

app.post("/chat", async (c) => {
  const { message } = await c.req.json();
  if (!message) {
    return c.text("Missing message in request body", 400);
  }
  try {
    const geminiService = new GeminiService();
    const systemPrompt = `
      You are a smart plant care assistant developed by GreenGuardian team.
      Your task is to answer questions strictly related to plants, their care, and related topics.
      If the question is unrelated to plants, politely redirect the user to ask plant-related questions.
    `;
    const response = await geminiService.getChatResponse(systemPrompt, message);
    console.log("Chat response:", response);
    return c.json({ response });
  } catch (error) {
    console.error("Error processing chat message:", error);
    return c.text("Failed to process chat message", 500);
  }
});

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
