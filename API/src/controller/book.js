
import connect from "../database"
import { DateTime } from "luxon"

export const AddBook = async (req, res) => {
    try {
        const { name, price, nha_xuat_ban, description, nha_cung_cap, image, tac_gia, category_id, nam_xuat_ban, promorions_id } = req.body
        let sql = `INSERT INTO books(name, description, price, nha_cung_cap, nha_xuat_ban, tac_gia, nam_xuat_ban, category_id, image, promorions_id )
VALUES('${name}', '${description}', ${price}, '${nha_cung_cap}', '${nha_xuat_ban}', '${tac_gia}', ${nam_xuat_ban}, ${category_id}, '${image}', ${promorions_id}) RETURNING *`

        connect.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Them that bai', err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Them thanh cong book', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
export const UpdateBook = async (req, res) => {
    try {
        const { name, price, nha_xuat_ban, description, nha_cung_cap, image, tac_gia, category_id, nam_xuat_ban } = req.body
        const id = req.params.id
        let sql = `
            UPDATE books 
            SET 
                name = '${name}', 
                description = '${description}', 
                price = ${price}, 
                nha_cung_cap = '${nha_cung_cap}', 
                nha_xuat_ban = '${nha_xuat_ban}', 
                tac_gia = '${tac_gia}', 
                nam_xuat_ban = ${nam_xuat_ban}, 
                category_id = ${category_id}, 
                image = '${image}'
            WHERE 
                id = ${id}
            RETURNING *`;

        connect.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Update that bai', err })
            }
            const data = result.rows[0]
            return res.status(200).json({ message: 'Update thanh cong book', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}
export const RemoveBook = async (req, res, next) => {
    try {
        const now = DateTime.now().setZone('Asia/Ho_Chi_Minh');
        const id = req.params.id
        let sql = `SELECT * FROM books WHERE id =${id}`
        connect.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Them vao thung rac that bai', err })
            }
            let sqlremove = `DELETE FROM books WHERE id = ${id}`
            connect.query(sqlremove, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'xoa sachs taij bang book that bai' })
                }
            })
            const data = result.rows[0]
            const time = (now.toString());
            let sqlbin = `INSERT INTO recycle_bin (books, created_at ) VALUES('{"id": ${data.id} , "name": "${data.name}", "description":"${data.description}", "price":${data.price} , "nha_cung_cap":"${data.nha_cung_cap}", "nha_xuat_ban":"${data.nha_xuat_ban}", "tac_gia":"${data.tac_gia}", "nam_xuat_ban":"${data.nam_xuat_ban}", "category_id":${data.category_id}, "image":"${data.image}"}',
'${time}') RETURNING *`
            connect.query(sqlbin, (err, result) => {
                if (err) {
                    // console.log(err);
                    return res.status(500).json({ message: "Loi khi them vao thung rac", err })
                }
                const bin = result.rows[0]
                return res.status(200).json({ message: 'Them vao thung rac thanh cong', bin })
            })
        })

    } catch (err) {
        return res.status(500).json({ message: 'Loi api' })
    }
}

export const GetAllBookPagination = async (req, res) => {
    try {
        const { sort = "createAt", order = "asc", limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;
        let sql = `SELECT * FROM books ORDER BY  ${sort} ${order === "desc" ? "DESC" : "ASC"} LIMIT ${limit} OFFSET ${offset};`;
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay book that bai', err })
            }
            const data = results.rows

            const countQuery = 'SELECT COUNT(*) as totalProducts FROM books;';
            connect.query(countQuery, (err, countResult) => {
                if (err) {
                    return res.json({
                        message: "Không lấy được tổng số sản phẩm"
                    });
                }
                const totalProducts = countResult.rows[0].totalproducts;
                const totalPages = Math.ceil(totalProducts / limit);
                // console.log(totalPages);
                return res.json({
                    message: "Danh sách sản phẩm",
                    data,
                    totalPages
                });
            })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const GetALlBook = async (req, res) => {
    try {
        const sql = `SELECT * FROM books`
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
export const GetOneBook = async (req, res) => {
    try {
        const sql = `SELECT * FROM books WHERE id =${req.params.id}`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay 1 that bai', err })
            }
            const data = results.rows
            return res.status(200).json({ message: 'Lay 1 thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const GetOutstan = async (req, res) => {
    try {
        const sql = `SELECT * FROM books WHERE outstan IS NOT NULL AND outstan = true;`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay outstan that bai', err })
            }
            const data = results.rows
            return res.status(200).json({ message: 'Lay outstan thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const GetDiscount = async (req, res) => {
    try {
        const sql = `SELECT * FROM books WHERE promorions_id > 0 LIMIT 8;`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay discount that bai', err })
            }
            const data = results.rows
            return res.status(200).json({ message: 'Lay distcount thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const SearchBook = (req, res) => {
    try {
        let { search } = req.body
        search = search.trim();
        const sql = "SELECT * FROM books WHERE name ILIKE $1;";
        connect.query(sql, [`%${search}%`], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'loi tim book' })
            }
            const data = result.rows
            if (!data.length) {
                return res.status(404).json({ message: 'Khong tim thay book nao!' })
            }
            return res.json({ message: 'Tim thay book', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const GetRelated = (req, res) => {
    try {
        const { category_id, book_id } = req.body
        let sql = ` SELECT * FROM books
      WHERE category_id = ${category_id} AND id != ${book_id}
      LIMIT 4;`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'loi khong tim thay san pham tuong tu' })
            }
            const data = results.rows
            return res.status(200).json({ message: 'tim thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'loi api' })
    }
}
export const PostOneBook = async (req, res) => {
    try {
        const { book_id } = req.body
        const sql = `SELECT * FROM books WHERE id =${book_id}`
        connect.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lay 1 that bai', err })
            }
            const data = results.rows[0]
            return res.status(200).json({ message: 'Lay 1 thanh cong', data })
        })
    } catch (err) {
        return res.status(500).json({ message: 'Loi api', err })
    }
}