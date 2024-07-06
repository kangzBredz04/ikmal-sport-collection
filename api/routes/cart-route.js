import express from "express";
import { addCart } from "../controller/cart-controller.js";

const router = express.Router();

router.get("/add", addCart);
// router.post("/register", registerAccount);

export default router;
