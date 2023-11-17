import express from "express";
import { GetOneUser, Signin, Signup } from "../controller/user";



const router = express.Router();

router.post("/user/signup", Signup);
router.post("/user/signin", Signin);
router.get("/user/:id/getone", GetOneUser);
export default router;