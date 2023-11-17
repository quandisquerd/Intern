import express from "express";
import { GetAllRecyclebin, GetAllRecyclebinPagination, RemoveBookRecyclebin, RestoreBook } from "../controller/recycleBin";
const router = express.Router();
router.get("/recyclebin", GetAllRecyclebin);
router.get("/recyclebin/pagination", GetAllRecyclebinPagination);
router.get("/recyclebin/:id", RestoreBook);
router.delete("/recyclebin/:id", RemoveBookRecyclebin);
export default router;