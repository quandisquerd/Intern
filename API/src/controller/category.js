
import connect from "../database"


export const AddCategory = async (req, res) => {
    try {
        const { name } = req.body
        let sql = `INSERT INTO categories(name)
        VALUES('${name}') RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) return res.status(500).json({ message: 'Them that bai' })
            const data = result.rows[0]
            return res.status(200).json({ message: 'Them thanh cong cateogry', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
export const GetALlCategory = async (req, res) => {
    try {
        const sql = `SELECT * FROM categories`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay All that bai', err })
            }
            const category = results.rows
            return res.status(200).json({ message: 'Lay All thanh cong', category })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}