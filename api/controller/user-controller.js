import { pool } from "../config/db.js";

export const getAllUser = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
