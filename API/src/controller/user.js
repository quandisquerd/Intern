import jwt from "jsonwebtoken";
import connect from "../database";
import bcrypt from 'bcrypt';

export const Signup = async (req, res, next) => {
    try {
        const { ho, ten, phone, address, province, district, ward, email, password, image } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const sqlsignup = `INSERT INTO users (ho,ten,phone, address, province,district, ward, email,password, image,role)
            VALUES('${ho}','${ten}','${phone}','${address}','${province}','${district}','${ward}','${email}','${hashedPassword}', '${image}',1) RETURNING *`
        connect.query(sqlsignup, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Dang ky that bai', err })
            }
            const user = results.rows[0]
            const accesstoken = jwt.sign({ id: user.id }, "boquan", { expiresIn: "1d" });
            return res.status(200).json({ message: 'Dang ky thanh cong', user, accesstoken })
        })

    } catch (err) {

        return res.status(500).json({ message: 'Loi api', err })
    }
}
export const Signin = (req, res) => {
    try {
        const { email, password } = req.body;
        let sql = `SELECT * FROM users WHERE email='${email}'`;
        connect.query(sql, async (err, result) => {
            if (result.rows.length === 0) {
                console.error(err);
                return res.status(500).json({
                    message: "Email không tồn tại!",
                });
            }
            const user = result.rows[0];

            console.log(user);
            console.log(password);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Mật khẩu không đúng" });
            }

            if (isPasswordValid) {
                const accesstoken = jwt.sign({ id: user.id }, "boquan", {
                    expiresIn: "1d",
                });
                return res.json({
                    message: "Đăng nhập thành công",
                    accesstoken,
                    user,
                });
            }
            return res.status(500).json({
                message: "Email hoặc mật khẩu không chính xác!",
            });

        });
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi api' })
    }
}
export const GetOneUser = (req, res) => {
    try {
        const { id } = req.params
        const sql = `SELECT * FROM users WHERE id=${id}`
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