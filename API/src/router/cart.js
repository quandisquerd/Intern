import express from "express";
import { AddToCart, GetBookInCart, RemoveBookCart } from "../controller/cart";



const router = express.Router();

router.post("/addtocart", AddToCart);
router.get("/getcart", GetBookInCart);
router.delete("/cart/:id", RemoveBookCart);
export default router;