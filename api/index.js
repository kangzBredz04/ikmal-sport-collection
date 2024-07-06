import express from "express";
import "dotenv/config";
import cors from "cors";

import ProductRoute from "./routes/product-route.js";
import UserRoute from "./routes/user-route.js";
import CartRoute from "./routes/cart-route.js";

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();
app.use("/api", router);

router.use("/product", ProductRoute);
router.use("/user", UserRoute);
router.use("/cart", CartRoute);

router.use("/getting-started", async (_req, res) => {
  res.status(200).json({
    message: "Selamat Datang Di Website Sport Collection",
  });
});

app.listen(process.env.API_PORT, () =>
  console.log("Server berhasil dijalankan.")
);
