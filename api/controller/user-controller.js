import { pool } from "../config/db.js";

export const getAllUser = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const registerAccount = async (req, res) => {
  const { username, password, full_name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username, pasword, full_name) VALUES ($1, $2, $3) RETURNING *",
      [username, password]
    );
    res.status(201).json({ msg: "Pendaftaran berhasil", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
