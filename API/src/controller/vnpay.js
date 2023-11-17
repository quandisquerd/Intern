
import config from '../config/default.json';

import moment from 'moment'
import querystring from 'qs'
import crypto from "crypto";
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
export const VnPay = (req, res, next) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        console.log(createDate);
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let tmnCode = "CGXZLS0Z"
        let secretKey = "XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN"
        let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
        let returnUrl = "http://localhost:8080/api/vnpay_return"
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.body.amount;
        let bankCode = req.body.bankCode;
        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);


        console.log("quan");
        let signData = querystring.stringify(vnp_Params, { encode: false });

        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        // res.redirect(vnpUrl)
        return res.status(200).json({ message: 'thanh toan thanh cong', vnpUrl })
    } catch (err) {
        return res.status(500).json({ message: 'lOi api vnpay', err });
    }
}

export const vnpayreturn = (req, res) => {

    let vnp_Params = req.query;
    console.log(vnp_Params);
    let secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    let tmnCode = "CGXZLS0Z"
    let secretKey = "XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN"

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        let amount = vnp_Params['vnp_Amount'] / 100; // Số tiền chuyển (đã chia cho 100)
        let amountFormatted = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        let createDate = vnp_Params['vnp_PayDate']; // "20230924072301"
        let year = createDate.substr(0, 4);
        let month = createDate.substr(4, 2);
        let day = createDate.substr(6, 2);
        let hour = createDate.substr(8, 2);
        let minute = createDate.substr(10, 2);
        let dateTimeMoment = moment(createDate, "YYYYMMDDHHmmss");
        let second = createDate.substr(12, 2);
        let dateTime = new Date(year, month - 1, day, hour, minute, second);
        const successHtml = `
        <!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bootstrap 5 Thank You Example</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body>
        <div class="vh-100 d-flex justify-content-center align-items-center">
            <div>
                <div class="mb-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-success" width="75" height="75"
                        fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                </div>
                <div class="text-center">
                    <h1>Thank You !</h1>
                    <p>Bạn đã giao dịch thành công!</p>
                    <div>
                        <div>
                            <label>Số Tiền Giao Dịch: ${amountFormatted}</label><br>
                             <label>Thời Gian Giao Dịch: ${dateTime}</label>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="closeTab()">Back Home</button>
                </div>
            </div>
             <script>
                function closeTab() {
                    window.close();
                }
                
            </script>
    </body>

</html>
        `;
        // Gửi trang HTML cho người dùng.
        res.send(successHtml);
    } else {

    }
}