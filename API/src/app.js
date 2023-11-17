import express from "express";
import connect from "./database";
import cors from "cors";
import RouterBook from "./router/books"
import RouterCategory from "./router/category"
import RouterUser from "./router/user"
import RouterRecycleBin from "./router/recycleBin"
import RouterPromotion from "./router/promotion"
import RouterCart from "./router/cart"
import RouterCheckout from "./router/checkout"
import RouterOrder from "./router/order"
import RouterVnPay from "./router/vnpay"
const app = express();
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Thêm DELETE và sửa lỗi dấu phẩy
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // Sửa lỗi dấu phẩy
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Thay 'true' thành 'true' (chuỗi)
    next();
});
// middleware
app.use(express.json());
app.use(cors());

// router
app.use('/api', RouterBook)
app.use('/api', RouterCategory)
app.use('/api', RouterUser)
app.use('/api', RouterRecycleBin)
app.use('/api', RouterPromotion)
app.use('/api', RouterCart)
app.use('/api', RouterCheckout)
app.use('/api', RouterOrder)
app.use('/api', RouterVnPay)
connect.connect((err) => {
    if (err) {
        console.log('That bai !');
    }
    console.log('Thanh cong');
})
export const viteNodeApp = app;