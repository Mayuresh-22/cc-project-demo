import { Pool } from "pg";
import type { User } from "../types/index.js";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
  ssl: { rejectUnauthorized: false },
});

class UserService {
  async getUser(uid: string) {
    const query = "SELECT * FROM users WHERE user_id = $1 LIMIT 1";
    const values = [uid];

    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error("User not found");
    }

    return rows[0];
  }

  async createUser(userData: User) {
    const query = `INSERT INTO users (user_id, email, username, first_name, last_name, profile_pic_url, location, climate_zone, notification_preferences) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const values = [
      userData.user_id,
      userData.email,
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.profile_pic_url,
      userData.location,
      userData.climate_zone,
      JSON.stringify(userData.notification_preferences),
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

export default UserService;
