import { Button, Form, Input, message } from "antd";
import CheckOutDetail from "./CheckOutDetail";
import { useGetAllDistrictQuery, useGetAllProvinceQuery, useGetAllWardQuery } from "../../api/country";
import { useEffect, useState } from "react";
import { useAddBCheckoutMutation } from "../../api/checkout";
import { pause } from "../../util/pause";
import { useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../../api/order";
import { useVnPayMutation } from "../../api/vnpay";


const CheckOut = ({ data, cart, onId }: any) => {
    const user = JSON.parse(localStorage.getItem('user')!)
    const { data: province } = useGetAllProvinceQuery('')
    const [provinceId, setprovinceId] = useState<any>()
    const [provinceName, setprovinceName] = useState<any>()
    const [districtId, setdistrictId] = useState<any>()
    const [districtName, setDistrictName] = useState<any>()
    const [wardname, setwardname] = useState<any>()
    const { data: district } = useGetAllDistrictQuery(provinceId)
    const { data: ward } = useGetAllWardQuery(districtId)
    const [payment, setpayment] = useState<any>()
    const [checkout] = useAddBCheckoutMutation()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [addorder] = useAddOrderMutation()
    const [vnpay] = useVnPayMutation()
    useEffect(() => {
        form.setFieldsValue(user?.user)
    }, [user?.user])
    const handleProvince = (e: any) => {
        const selectedValue = e.target.value;
        const selectedProvinceId = selectedValue.split(':')[1];
        setprovinceId(selectedProvinceId)
        const selectedProvinceName = selectedValue.split(':')[0];
        setprovinceName(selectedProvinceName)
    }
    const handleDistrict = (e: any) => {
        const selectedValue = e.target.value;
        const selectedDistrictId = selectedValue.split(':')[1];
        setdistrictId(selectedDistrictId)
        const selectedDistrictName = selectedValue.split(':')[0];
        setDistrictName(selectedDistrictName)
    }
    let bookID: any = []
    const [bookid, setbookid] = useState<any>()
    const bookId = (id: any) => {
        bookID.push(id)
        setbookid(bookID);
    }
    const onFinish = (e: any) => {
        const datas = {
            user_id: user?.user?.id,
            total: data + 1.2,
            payment: payment,
            province: provinceName,
            district: districtName,
            ward: wardname,
            address: e.addresss,
            book_id: bookid
        }
        checkout(datas)
            .unwrap()
            .then((data1: any) => {
                messageApi.open({
                    type: 'loading',
                    content: 'Đang đặt hàng...',
                    duration: 1,
                })
                const data2 = {
                    user_id: user?.user?.id,
                    book_id: bookid,
                    status: "Đã Đặt Hàng",
                    checkout_id: data1?.data?.id,
                    total: data + 1.2
                }
                addorder(data2)
                    .unwrap()
                    .then(async (data2: any) => {
                        onId(data2?.data?.id)
                        messageApi.open({
                            type: 'loading',
                            content: 'Đang chuyển trang...',
                            duration: 1,
                        })
                        await pause(1000)
                        navigate('/order')
                    })
                    .catch(({ data }: any) => {
                        messageApi.open({
                            type: 'error',
                            content: data?.message
                        })
                    })

            })
            .catch(({ data }: any) => {
                messageApi.open({
                    type: 'error',
                    content: data?.message
                })
            })
    }
    const [dis, setdis] = useState(true)
    const checkPayment = (_: any, value: any) => {
        if (!value) {
            setdis(true)
            return Promise.reject('Vui lòng chọn ít nhất một phương thức thanh toán!');
        } else {
            setdis(false)
            return Promise.resolve();
        }


    }
    function openNewTabWithUrl(url: any) {
        const newTab = window.open(url, '_blank');
        if (newTab !== null) {
            newTab.focus();
        } else {
            // Xử lý trường hợp newTab là null
            console.error('Không thể mở tab mới.');
        }
    }
    const [checkpay, setcheckpay] = useState<any>(false)
    const handleVNPAY = (e: any) => {
        if (checkpay) {
            return
        }
        setpayment(e.target.value)
        const data1 = {
            "amount": (data * 23000) + 1.2,
            "bankCode": "VNPAY",
            "language": "vn"
        }
        vnpay(data1)
            .unwrap()
            .then((data: any) => {
                const url = data?.vnpUrl;
                openNewTabWithUrl(url);
                setcheckpay(true)
            })

    }
    return (
        <>
            {contextHolder}
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Check Out</h4>
                                <div className="breadcrumb__links">
                                    <a href="./index.html">Home</a>
                                    <a href="./shop.html">Shop</a>
                                    <span>Check Out</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout spad">
                <div className="container">
                    <div className="checkout__form">
                        <Form onFinish={onFinish} form={form}>
                            <div className="row">
                                <div className="col-lg-8 col-md-6">

                                    <h6 className="checkout__title">Billing Details</h6>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <p>Fist Name<span>*</span></p>
                                            <Form.Item className="checkout__input" name="ten" rules={[{ required: true, message: 'Không được để trống tên ' }]}>
                                                <Input type="text" />
                                            </Form.Item>
                                        </div>
                                        <Form.Item className="col-lg-6" name="ho" rules={[{ required: true, message: 'Không được để trống họ ' }]}>
                                            <div className="checkout__input">
                                                <p>Last Name<span>*</span></p>
                                                <Input type="text" defaultValue={user?.user?.ho} />
                                            </div>
                                        </Form.Item>
                                    </div>
                                    <p>Địa Chỉ<span>*</span></p>
                                    <Form.Item className="checkout__input" name='addresss' rules={[{ required: true, message: 'Không được để trống địa chỉ ' }]}>
                                        <Input type="text" defaultValue={user?.user?.address} />
                                    </Form.Item>
                                    <p>Tỉnh<span>*</span></p>
                                    <Form.Item className="checkout__input" name='povinces' rules={[{ required: true, message: 'Không được để trống tỉnh ' }]}>
                                        <select className="custom-select" onChange={handleProvince}>
                                            <option value="">--- Chọn tỉnh ---</option>
                                            {province?.results?.map((data: any) => {
                                                return (<>
                                                    <option value={`${data?.province_name}:${data?.province_id}`}>{data?.province_name}</option>
                                                </>)
                                            })}
                                        </select>
                                    </Form.Item>
                                    <p>Huyện<span>*</span></p>
                                    <Form.Item className="checkout__input" name='districts' rules={[{ required: true, message: 'Không được để trống huyện ' }]}>

                                        <select className="custom-select" onChange={handleDistrict}>
                                            <option value="">--- Chọn huyện ---</option>
                                            {district?.results?.map((data: any) => {
                                                return (<>
                                                    <option value={`${data?.district_name}:${data?.district_id}`}>{data?.district_name}</option>
                                                </>)

                                            })}

                                        </select>
                                    </Form.Item>
                                    <p>Xã<span>*</span></p>
                                    <Form.Item className="checkout__input" name='wards' rules={[{ required: true, message: 'Không được để trống xã ' }]}>
                                        <select className="custom-select" onChange={(e) => setwardname(e.target.value)}>
                                            <option value="">--- Chọn xã ---</option>
                                            {ward?.results?.map((data: any) => {
                                                return (<>
                                                    <option value={data?.ward_name}>{data?.ward_name}</option>
                                                </>)
                                            })}
                                        </select>
                                    </Form.Item>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <p>Phone<span>*</span></p>
                                            <Form.Item className="checkout__input" name="phone" rules={[{ required: true, message: 'Không được để trống số điện thoại ' }]}>
                                                <Input type="text" defaultValue={user?.user?.phone} />
                                            </Form.Item>
                                        </div>
                                        <p>Email<span>*</span></p>
                                        <div className="col-lg-6">
                                            <Form.Item className="checkout__input" name="email" rules={[{ required: true, message: 'Không được để trống email ' }]}>
                                                <Input type="text" defaultValue={user?.user?.email} />
                                            </Form.Item>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="checkout__order">
                                        <h4 className="order__title">Your order</h4>
                                        <div className="checkout__order__products">Book <span>Total</span></div>
                                        <ul className="checkout__total__products">
                                            {cart?.map((data: any, index: any) => (<CheckOutDetail index={index} data={data?.book_id} quantity={data?.quantity} onBook={bookId} />))}

                                        </ul>
                                        <ul className="checkout__total__all">
                                            <li>Subtotal <span>{data} $</span></li>
                                            <li>Ship <span>1.2 $</span></li>
                                            <li>Total <span>{data + 1.2} $</span></li>
                                        </ul>

                                        <Form.Item className="checkout__input__checkbox" name="payment1" >
                                            <label htmlFor="payment" >
                                                Thanh toán khi nhận hàng
                                                <Input type="radio" id="payment" name="a" value="Thanh toán khi nhận hàng" onChange={(e) => setpayment(e.target.value)} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </Form.Item>
                                        <Form.Item className="checkout__input__checkbox" name="payment1" rules={[{ validator: checkPayment }]}>
                                            <label htmlFor="paypal">

                                                {checkpay ? 'Vnpay (Đã Thanh Toán)' : 'Vnpay'}
                                                <Input type="radio" id="paypal" name="a" value='Thanh toán qua VNPAY' onChange={(e) => handleVNPAY(e)} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </Form.Item>


                                        <Button htmlType='submit' className="site-btn" style={{ height: '60px' }} disabled={dis}>PLACE ORDER</Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>

        </>
    )
}

export default CheckOut