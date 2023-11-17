import connect from "../database"

export const GetAllRecyclebin = async (req, res) => {
    try {
        const sql = `SELECT * FROM recycle_bin`
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
export const GetAllRecyclebinPagination = async (req, res) => {
    try {
        const { sort = "createAt", order = "asc", limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;
        let sql = `SELECT * FROM recycle_bin ORDER BY  ${sort} ${order === "desc" ? "DESC" : "ASC"} LIMIT ${limit} OFFSET ${offset};`;
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay all that bai', err })
            }
            const data = results.rows

            const countQuery = 'SELECT COUNT(*) as totalProducts FROM recycle_bin;';
            connect.query(countQuery, (err, countResult) => {
                if (err) {
                    return res.json({
                        message: "Không lấy được tổng số sản phẩm"
                    });
                }
                const totalRecycle = countResult.rows[0].totalproducts;
                const totalPages = Math.ceil(totalRecycle / limit);
                // console.log(totalPages);
                return res.json({
                    message: "Danh sách all",
                    data,
                    totalPages
                });
            })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}

export const RestoreBook = (req, res) => {
    try {
        const id = req.params.id
        let sql = `SELECT * FROM recycle_bin WHERE id = '${id}'`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Khong tim thay san pham da xoa trong thung rac", err })
            }
            const recyclebin = result.rows[0]
            const book = recyclebin.books
            let sqlrestore = `INSERT INTO books (id, name,image,price,tac_gia,category_id,description,nam_xuat_ban,nha_cung_cap, nha_xuat_ban) VALUES (${book.id}, '${book.name}', '${book.image}', ${book.price}, '${book.tac_gia}', ${book.category_id}, '${book.description}','${book.nam_xuat_ban}', '${book.nha_cung_cap}', '${book.nha_xuat_ban}')  RETURNING *`
            connect.query(sqlrestore, async (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Khong khoi phuc duoc san pham", err })
                }
                const product = result.rows[0]
                let slqremoveProduct = `DELETE FROM recycle_bin WHERE id= ${id}`
                connect.query(slqremoveProduct, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: "Xoa recyclebin that bai", err })
                    }
                    return res.status(200).json({ message: "Khoi phuc thanh cong book", product })
                })

            })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const RemoveBookRecyclebin = (req, res) => {
    try {
        const id = req.params.id

        let slqremoveProduct = `DELETE FROM recycle_bin WHERE id= ${id}`
        connect.query(slqremoveProduct, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Xoa recyclebin that bai", err })
            }
            return res.status(200).json({ message: "Xoa thanh cong book" })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}