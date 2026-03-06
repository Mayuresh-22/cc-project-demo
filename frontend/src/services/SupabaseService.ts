import { createClient, Session } from "@supabase/supabase-js";
import axios from "axios";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const APP_BACKEND_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

class SupabaseService {
  static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  static async signup(email: string, password: string, metadata: { [key: string]: any }) {
    const { data, error } = await supabase.auth.signUp(
      {
        email, password, options: {
          data: metadata
        }
      }
    );
    if (error) throw error;

    // Send user data to the "/user" endpoint
    try {
      await axios.post(`${APP_BACKEND_BASE_URL}/user`, {
        user_id: data.user?.id,
        profile_pic_url: null,
        notification_preferences: null,
        ...metadata,
      });
    } catch (postError) {
      console.error("Error creating user in database:", postError);
      throw postError;
    }

    return data;
  }

  static async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error);
      return null;
    }
    return data.session;
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

export default SupabaseService;
