import connect from "../database";
import { DateTime } from "luxon"
import jwt from "jsonwebtoken";
export const AddOrder = (req, res) => {
    try {
        const now = DateTime.now().setZone('Asia/Ho_Chi_Minh');
        const time = (now.toString());
        console.log(time);
        const { book_id, user_id, checkout_id, status, total } = req.body

        const sql = `INSERT INTO orders (book_id, user_id, checkout_id, status, order_time,total) VALUES(Array[${book_id}], ${user_id}, ${checkout_id}, '${status}', '${time}', ${total}) RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json('loi k them order dc', err)
            }
            const data = result.rows[0]
            return res.status(200).json({ message: ' them thanh cong', data })
        })

    } catch (e) {
        return res.status(500).json({ message: 'Loi api', e })
    }
}
export const GetOneOrder = (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, "boquan");
        const userId = decoded.id;
        const { id } = req.params
        const sql = `SELECT * FROM orders WHERE id=${id} AND user_id=${userId}`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Khong tim thay', err })
            }
            const data = result.rows
            return res.status(200).json({ message: 'Lay 1 thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const UpdateDone = (req, res) => {
    try {
        const sql = `UPDATE "orders" SET status = 'Đã Nhận Hàng' WHERE id = ${req.params.id}  RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'khong sua duoc trang thai done', err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'sua thanh cong trang thai done', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const UpdateShip = (req, res) => {
    try {
        const sql = `UPDATE "orders" SET status = 'Đã Xác Nhận' WHERE id = ${req.params.id}  RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'khong sua duoc trang thai doi nhan', err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'sua thanh cong trang thai doi nhan', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const UpdateCancell = (req, res) => {
    try {
        const sql = `UPDATE "orders" SET status = 'Đã Hủy Hàng' WHERE id = ${req.params.id}  RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'khong sua duoc trang thai cancell', err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'sua thanh cong trang thai cancell', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}

export const GetAllOrder = (req, res) => {
    try {
        const sql = `SELECT * FROM orders
ORDER BY CASE 
    WHEN status = 'Đã Đặt Hàng' THEN 1
    WHEN status = 'Đã Hủy Hàng' THEN 3
    ELSE 2
END;`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'khong lay dc danh sach', err })
            }
            const data = result.rows
            return res.status(200).json({ message: 'lay thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}