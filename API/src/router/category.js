import express from "express";
import { AddCategory, GetALlCategory } from "../controller/category";


const router = express.Router();

router.post("/category/add", AddCategory);
router.get("/category", GetALlCategory);
export default router;