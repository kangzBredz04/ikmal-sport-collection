import express from "express";
import { getAllProduct } from "../controller/product-controller";

const router = express.Router();

router.get("/get-all", getAllProduct);

export default router;
