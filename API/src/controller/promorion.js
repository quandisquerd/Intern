
import connect from "../database"


export const AddPromorion = async (req, res) => {
    try {
        const { name, discount } = req.body
        let sql = `INSERT INTO promotions(name,discount)
        VALUES('${name}', ${discount}) RETURNING *`
        connect.query(sql, (err, result) => {
            if (err) return res.status(500).json({ message: 'Them that bai' })
            const data = result.rows[0]
            return res.status(200).json({ message: 'Them thanh cong cateogry', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
export const GetALlPromorion = async (req, res) => {
    try {
        const sql = `SELECT * FROM promotions`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay All that bai', err })
            }
            const data = results.rows
            return res.status(200).json({ message: 'Lay All thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}