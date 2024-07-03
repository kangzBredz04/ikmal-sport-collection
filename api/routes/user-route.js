import express from "express";
import { getAllUser } from "../controller/user-controller.js";

const router = express.Router();

router.get("/get-all", getAllUser);

export default router;
