export interface User {
  user_id?: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_pic_url?: string;
  location?: string;
  climate_zone?: string;
  notification_preferences?: {
    email_notifications?: boolean;
    push_notifications?: boolean;
    watering_reminders?: boolean;
    care_tips?: boolean;
  };
  created_at?: Date;
  updated_at?: Date;
}

export interface Plant {
  plant_id?: string;
  user_id: string;
  plant_name: string;
  nickname?: string;
  plant_type?: string;
  species?: string;
  image_url?: string;
  location_in_home?: string;
  pot_size?: string;
  acquisition_date?: string;
  last_watered?: string;
  sunlight_exposure?: string;
  soil_type?: string;
  health_status?: string;
  care_recommendations?: string;
  created_at?: Date;
  updated_at?: Date;
}
