import express from "express";
import { AddCheckOut, GetOneCheckOut } from "../controller/checkout";



const router = express.Router();
router.post("/checkout/add", AddCheckOut);
router.get("/checkout/:id", GetOneCheckOut);
export default router;