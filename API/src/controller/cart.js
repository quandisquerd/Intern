import connect from "../database";
import jwt from "jsonwebtoken";

export const AddToCart = async (req, res) => {
    try {
        const { book_id, quantity } = req.body;
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, "boquan");
        const userId = decoded.id;
        let text = 'SELECT * FROM cart WHERE book_id = $1 AND user_id = $2'
        const values = [book_id, userId]
        connect.query(text, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Khong thay san pham trong gio hang' })
            }
            const data = result.rows[0]
            if (data) {
                const newQuantity = data.quantity + quantity
                let sql = `UPDATE cart SET quantity =$1 WHERE book_id = $2 AND user_id = $3 RETURNING *`
                const updateValues = [newQuantity, book_id, userId];
                connect.query(sql, updateValues, (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Khong thay san pham trong gio hang', err })
                    }
                    const data1 = results.rows[0]
                    return res.status(200).json({ message: 'Them vao gio hang thanh cong', data1 })
                })
            } else {
                let sql = ` INSERT INTO cart (book_id, quantity, user_id) VALUES ($1, $2, $3) RETURNING *`
                const value = [book_id, quantity, userId]
                connect.query(sql, value, (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Them that bai ' })
                    }
                    const data = results.rows[0]
                    return res.status(200).json({ message: 'Them vao gio hang thanh cong', data })
                })
            }
        });
    } catch (e) {
        return res.status(500).json({ message: 'loi api', e })
    }
}

export const GetBookInCart = (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, "boquan");
        const userId = decoded.id;
        let sql = ` SELECT * FROM cart WHERE user_id = ${userId}`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Khong thay gio hang' })
            }
            const data = result.rows
            return res.status(200).json({ message: 'tim thay cart', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
export const RemoveBookCart = (req, res) => {
    try {
        const { id } = req.params
        let sql = `DELETE FROM cart
WHERE id = ${id};`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Xoa that bai' })
            }
            const data = result.rows
            return res.status(200).json({ message: 'Xoa thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}