import express from "express";
import { AddBook, GetALlBook, GetAllBookPagination, GetDiscount, GetOneBook, GetOutstan, GetRelated, PostOneBook, RemoveBook, SearchBook, UpdateBook } from "../controller/book";


const router = express.Router();

router.post("/book/add", AddBook);
router.delete("/book/:id", RemoveBook);
router.get("/book/pagination", GetAllBookPagination);
router.get("/book", GetALlBook);
router.get("/book/:id", GetOneBook);
router.get("/outstan", GetOutstan);
router.get("/discount", GetDiscount);
router.patch("/book/edit/:id", UpdateBook);
router.post("/book/search", SearchBook);
router.post("/book/related", GetRelated);
router.post("/book/cart", PostOneBook);
export default router;