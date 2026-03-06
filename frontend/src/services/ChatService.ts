import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

export const sendMessageToChatBot = async (message: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/chat`, { message });
    return response.data.response;
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    throw error;
  }
};
