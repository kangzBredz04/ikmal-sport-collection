import { pool } from "../config/db.js";

export const addCart = async (req, res) => {
  const { id_user, id_product, total } = req.body;
  try {
    const findCart = await pool.query(
      "SELECT * FROM carts WHERE id_user = $1 AND id_product = $2",
      [id_user, id_product]
    );

    const findStock = await pool.query("SELECT * FROM products WHERE id = $1", [
      id_product,
    ]);

    if (findCart.rows[0]) {
      if (findStock.rows[0].stok < total) {
        res.send("Stok tidak mencukupi");
      } else {
        await pool.query("UPDATE carts SET total = total + $1 WHERE id = $2", [
          total,
          findCart.rows[0].id,
        ]);
        res.status(200).json({
          msg: "Berhasil ditambahkan ke keranjang",
        });
      }
    } else {
      if (findStock.rows[0].stock < total) {
        res.send("Stok tidak mencukupi");
      } else {
        await pool.query(
          "INSERT INTO carts (id_user, id_product, total) VALUES ($1, $2, $3) RETURNING *",
          [id_user, id_product, total]
        );
        res.status(200).json({
          msg: "Berhasil ditambahkan ke keranjang",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCartByIdCustomer = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT c.id, c.id_product, c.total, p.image_1, p.name, p.price 
      FROM carts c 
      JOIN products p ON c.id_product = p.id WHERE c.id_user = $1
    `,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const deleteCart = async (req, res) => {
//   try {
//     await pool.query("DELETE FROM carts WHERE id = $1", [req.params.id]);
//     res.status(200).json({ msg: "Keranjang berhasil dihapus." });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };
