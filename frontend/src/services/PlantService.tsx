import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

export const addPlant = async (plantData: any) => {
  const formData = new FormData();
  Object.keys(plantData).forEach((key) => {
    if (key === "image" && plantData[key]) {
      formData.append(key, plantData[key]); // Append the file
    } else {
      formData.append(key, plantData[key]);
    }
  });

  try {
    const response = await axios.post(`${BASE_URL}/plants`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding plant:", error);
    throw error;
  }
};

export const fetchUserPlants = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/plants`, {
      params: { uid: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user plants:", error);
    throw error;
  }
};

export const fetchPlantById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/plants/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching plant with ID ${id}:`, error);
    throw error;
  }
};
