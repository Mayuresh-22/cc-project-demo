import { Pool } from "pg";
import type { Plant } from "../types/index.js";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
  ssl: { rejectUnauthorized: false }
});


class PlantService {
  async getUserPlants(user_id: string) {
    const query = "SELECT * FROM plants WHERE user_id = $1 ORDER BY created_at DESC";
    const values = [user_id];

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async getPlantById(plant_id: string) {
    const query = "SELECT * FROM plants WHERE plant_id = $1 LIMIT 1";
    const values = [plant_id];

    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error("Plant not found");
    }

    return rows[0];
  }

  async createPlant(plantData: Plant, imageUrl: string): Promise<Plant | null> {
    try {
      const query = `
        INSERT INTO plants (
          user_id, plant_name, nickname, plant_type, species, image_url,
          location_in_home, pot_size, acquisition_date, last_watered,
          sunlight_exposure, soil_type, health_status, care_recommendations
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        ) RETURNING *;
      `;

      const values = [
        plantData.user_id,
        plantData.plant_name,
        plantData.nickname,
        plantData.plant_type,
        plantData.species,
        imageUrl,
        plantData.location_in_home,
        plantData.pot_size,
        plantData.acquisition_date,
        plantData.last_watered,
        plantData.sunlight_exposure,
        plantData.soil_type,
        plantData.health_status,
        plantData.care_recommendations,
      ];

      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error creating plant:", error);
      return null;
    }
  }

  async updateCareRecommendations(plantId: string, careRecommendations: string) {
    const query = "UPDATE plants SET care_recommendations = $1 WHERE plant_id = $2";
    const values = [careRecommendations, plantId];

    const { rowCount } = await pool.query(query, values);
    if (rowCount === 0) {
      throw new Error("Failed to update care recommendations");
    }

    console.log(`Updated care recommendations for plant ID: ${plantId}`);
  }
}

export default PlantService;
