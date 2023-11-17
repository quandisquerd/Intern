import express from "express";
import { GetOneUser, Signin, Signup } from "../controller/user";
import { VnPay, vnpayreturn } from "../controller/vnpay";



const router = express.Router();

router.post("/vnpay", VnPay);
router.get("/vnpay_return", vnpayreturn);
export default router;