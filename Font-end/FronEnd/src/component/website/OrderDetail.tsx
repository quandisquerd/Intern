import { Link, useParams } from "react-router-dom"
import { useGetOneOrderQuery, useUpdateCancellMutation, useUpdateDoneMutation } from "../../api/order"
import { Button, Skeleton, Steps, message } from "antd"
import { useEffect, useState } from "react"
// import './orderdetail.css'
import BookDetail_Order from "./BookDetail_Order"
import { useGetOneChekoutQuery } from "../../api/checkout"
import { createApi } from '@reduxjs/toolkit/query/react';

const OrderDetail = () => {
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user')!)
    const token = user?.accesstoken
    const all = { id: id, token: token }
    const { data: order, isLoading, refetch } = useGetOneOrderQuery(all)
    const [check, setcheck] = useState(0)
    const [huy, sethuy] = useState<any>(false)
    const [nhan, setnhan] = useState<any>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [updatedone] = useUpdateDoneMutation()
    const [updatecancel] = useUpdateCancellMutation()
    const [cancel, setcancel] = useState<any>(false)
    const { data: checkout } = useGetOneChekoutQuery(order?.data[0]?.checkout_id);

    useEffect(() => {
        refetch(); // Gọi lại truy vấn API bằng cách sử dụng refetch
    }, [id, refetch]);
    const [dulieu, setdulieu] = useState<any>()
    const [color, setcolor] = useState<any>('process')
    let icons: any
    useEffect(() => {
        if (order?.data[0]?.status == 'Đã Đặt Hàng') {
            setcheck(0)
            sethuy(false)
            setnhan(false)
        } else if (order?.data[0]?.status == 'Đã Xác Nhận') {
            setcheck(1)
            sethuy(true)
            setnhan(true)
        } else if (order?.data[0]?.status == 'Đã Nhận Hàng') {
            setcheck(2)
            sethuy(true)
            setnhan(false)
        } else if (order?.data[0]?.status == 'Đã Hủy Hàng') {
            icons = [{
                title: 'Đã Hủy',
            },
            {
                title: '',
            },
            {
                title: '',
            }]
            sethuy(true)
            setdulieu(icons)
            setcolor('error')
        } else {
            icons = [{
                title: 'Đã Đặt Hàng',
            },
            {
                title: 'Đã Xác Nhận',
            },
            {
                title: 'Đã Nhận Hàng',

            }]
            setdulieu(icons)
        }
    }, [order])
    const updateDone = () => {
        updatedone(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã cập nhập lại trạng thái đơn hàng thành công!'
                })
            })
            .catch(({ data }: any) => {
                messageApi.open({
                    type: 'error',
                    content: data?.message
                })
            })
    }
    const updateCancell = () => {
        updatecancel(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã hủy đơn hàng thành công!'

                })
                setcancel(true)
                setcheck(0)
            })
            .catch(({ data }: any) => {
                messageApi.open({
                    type: 'error',
                    content: data?.message
                })
            })
    }
    const dateObject = new Date(order?.data[0]?.order_time);
    const ngay = dateObject.toDateString(); // Lấy ngày
    const gio = dateObject.toLocaleTimeString(); // Lấy giờ
    return (
        <>
            {contextHolder}
            {user ? <>
                <section className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__text">
                                    <h4>Order Detail</h4>
                                    <div >
                                        <a >Home/ </a>
                                        <a >Order/ </a>
                                        <span>Order Detail</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {isLoading ? <Skeleton /> : <div style={{ margin: '0 auto', marginTop: '50px', marginBottom: '50px' }}> <div className="d-flex flex-column justify-content-center align-items-center" id="order-heading" style={{ borderBottomWidth: 0, borderBottomColor: 'transparent', backgroundColor: '#fff', width: '50%', margin: '0 auto', background: '#EEEEEE' }}>
                    <div className="text-uppercase" style={{ marginTop: '20px' }}>
                        <p>Order detail</p>
                    </div>
                    <div className="h4">{ngay}  {gio}</div>
                    <Steps
                        style={{ marginTop: '50px', marginBottom: '30px', padding: '10px 40px' }}
                        // current={1}
                        status={color}
                        current={check}

                        items={dulieu}
                    />
                </div>
                    <div className="wrapper " style={{ width: '50%', margin: '0 auto', background: '#EEEEEE' }}>
                        {order?.data[0]?.book_id?.map((id: any, index: any) => (<BookDetail_Order data={id} index={index} style={{ background: '#EEEEEE' }} />))}
                        <div className="pt-2 border-bottom mb-3"></div>
                        <div className="d-flex justify-content-start align-items-center pl-3" style={{ width: '90%', margin: '0 auto', padding: '10px', background: '#EEEEEE' }}>
                            <div className="text-muted">Payment Method</div>
                            <div className="ml-auto">{checkout?.data[0]?.payment} </div>
                        </div>

                        <div className="d-flex justify-content-start align-items-center pl-3 py-3 mb-4 border-bottom" style={{ width: '90%', margin: '0 auto', padding: '10px' }}>
                            <div className="text-muted"> Total </div>
                            <div className="ml-auto h5"> {checkout?.data[0]?.total}  </div>
                        </div>
                        <div className="row border rounded p-1 my-3" style={{ width: '90%', margin: '0 auto', padding: '10px' }}>

                            <div className="col-md-6 py-3" >
                                <div className="d-flex flex-column align-items start"> <b>Shipping Address</b>
                                    <p className="text-justify pt-2">{user?.user?.ho} {user?.user?.ten}, {checkout?.data[0]?.address}, {checkout?.data[0]?.ward},</p>
                                    <p className="text-justify">{checkout?.data[0]?.district}, {checkout?.data[0]?.province}</p>
                                    <p className="text-justify">Phone: {user?.user?.phone}</p>
                                    <p className="text-justify">Date: {ngay} {gio}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: '30px 10px', marginLeft:'20px'}}>
                            <Button disabled={huy} onClick={() => updateCancell()}>Hủy Đơn Hàng</Button><span> </span>
                            {nhan ? <Button onClick={() => updateDone()}>Đã Nhận Hàng</Button> : ""}
                        </div>
                    </div>

                </div>}</> : <>  <div className="container-xxl container-p-y" style={{ width: '100%', marginTop: '80px', marginBottom: '80px' }}>
                    <div className="misc-wrapper" style={{ width: '100%', margin: '0,auto', textAlign: 'center' }}>
                        <h2 className="mb-2 mx-2">Page Not Found :(</h2>
                        <p className="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
                        <Link to="/" className="btn btn-primary">Back to home</Link>
                        <div className="mt-3">
                            <img
                                src="../assets/img/illustrations/page-misc-error-light.png"
                                alt="page-misc-error-light"
                                width="500"
                                className="img-fluid"
                                data-app-dark-img="illustrations/page-misc-error-dark.png"
                                data-app-light-img="illustrations/page-misc-error-light.png"
                            />
                        </div>
                    </div>
                </div></>}



        </>
    )
}

export default OrderDetail