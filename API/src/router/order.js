import express from "express";
import { AddCategory, GetALlCategory } from "../controller/category";
import { AddOrder, GetAllOrder, GetOneOrder, UpdateCancell, UpdateDone, UpdateShip } from "../controller/order";



const router = express.Router();
router.post("/order/add", AddOrder);
router.get("/order", GetAllOrder);
router.get("/order/:id", GetOneOrder);
router.patch("/order/:id/done", UpdateDone);
router.patch("/order/:id/cancell", UpdateCancell);
router.patch("/order/:id/ship", UpdateShip);
export default router;