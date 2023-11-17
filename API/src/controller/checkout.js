import connect from "../database";

export const AddCheckOut = (req, res) => {
    try {
        const { book_id, user_id, province, district, ward, address, total, payment } = req.body
        const sql = `INSERT INTO checkout(user_id, province, district, ward, address, total, payment, book_id) VALUES (${user_id},'${province}', '${district}', '${ward}', '${address}', ${total}, '${payment}', Array[${book_id}]) RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Khong them duoc checkout', err })
            }
            const data = result.rows[0]
            const sql1 = `DELETE FROM cart
WHERE user_id = ${user_id}`
            connect.query(sql1, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'xoas dudwocj sanr pham trong gio hang', err })
                }
                return res.status(200).json({ message: 'Them thanh cong checkout', data })
            })

        })
    } catch (e) {
        return res.status(500).json({ message: 'Loi api', e })
    }
}
export const GetOneCheckOut = (req, res) => {
    try {
        const { id } = req.params
        const sql = `SELECT * FROM checkout WHERE id=${id}`
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