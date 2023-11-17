import express from "express";
import { AddPromorion, GetALlPromorion } from "../controller/promorion";
const router = express.Router();
router.get("/promotion", GetALlPromorion);
router.post("/promotion/add", AddPromorion)
export default router;