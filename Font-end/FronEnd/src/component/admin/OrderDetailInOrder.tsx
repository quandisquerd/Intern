import { useEffect, useState } from "react";
import { useGetOneUserQuery } from "../../api/user";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useUpdateCancellMutation, useUpdateShipMutation } from "../../api/order";
import { Popconfirm, message } from "antd";


const OrderDetailInOrder = ({ data, index }: any) => {
    const { data: user, isLoading } = useGetOneUserQuery(data?.user_id)
    const [status, setstatus] = useState<any>()
    const [check, setchek] = useState<any>(false)
    const [updateShip] = useUpdateShipMutation()
    const [updatecancel, {isLoading:updateCanceling}] = useUpdateCancellMutation()
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (data?.status == 'Đã Nhận Hàng') {
            setstatus('bg-label-success')
            setchek(false)
        } else if (data?.status == 'Đã Xác Nhận') {
            setstatus('bg-label-info')
            setchek(false)
        } else if (data?.status == 'Đã Đặt Hàng') {
            setstatus('bg-label-primary')
            setchek(true)
        } else {
            setstatus('bg-label-warning')
            setchek(false)
        }
    }, [data])
    const dateObject = new Date(data?.order_time);
    const ngay = dateObject.toDateString(); // Lấy ngày
    const gio = dateObject.toLocaleTimeString(); // Lấy giờ
    const handleOK = (id: any) => {
        updateShip(id)
            .unwrap()
            .then((data: any) => {
                messageApi.open({
                    type: 'loading',
                    content: 'Đang xác nhận đơn hàng...',
                    duration: 2,
                })
                    .then(() => message.success('Xác nhận đơn hàng thành công thành công!', 2))
                    .then(() => message.info('Danh sách đơn hàng đã được cập nhập lại!', 2));
            })

    }
    const handleNO = (id: any) => {
        updatecancel(id)
            .unwrap()
            .then((data: any) => {
                messageApi.open({
                    type: 'loading',
                    content: 'Đang hủy đơn hàng...',
                    duration: 2,
                })
                    .then(() => message.success('Hủy đơn hàng thành công thành công!', 2))
                    .then(() => message.info('Danh sách đơn hàng đã được cập nhập lại!', 2));
            })
        
    }
    return (
        <>
            {contextHolder}
            <tr style={{ textAlign: 'center'}}>
                <td><i className="fab fa-angular fa-lg text-danger me-3"></i> {index + 1}</td>
                <td>
                    <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li
                            data-bs-toggle="tooltip"
                            data-popup="tooltip-custom"
                            data-bs-placement="top"
                            className="avatar avatar-xs pull-up"
                            title="Christina Parker"
                        >
                            <img src={user?.data[0]?.image} alt="Avatar" className="rounded-circle" /> <strong style={{ marginLeft: '5px' }}>{user?.data[0]?.ho} {user?.data[0]?.ten}</strong>
                        </li>
                    </ul>
                </td>
                <td>{ngay} {gio}</td>

                <td ><span className={`badge ${status} me-1`}>{data?.status}</span></td>
                <td>{data?.total} $</td>
                <td>
                    {check ? <><CheckCircleOutlined style={{ color: 'green', fontSize: '25px' ,marginRight:'10px'}} onClick={() => handleOK(data?.id)} />  <Popconfirm
                        placement="topRight"
                        title="Hủy đơn hàng"
                        description="Bạn có muốn hủy đơn hàng này?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleNO(data?.id)}
                    >
                        <CloseCircleOutlined style={{ color: 'red', fontSize: '25px' }} />
                    </Popconfirm>  </> : <><div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item"
                            ><i className="bx bx-edit-alt me-1"></i> Edit</a>
                        </div>
                    </div></>}

                </td>
            </tr>
        </>
    )
}

export default OrderDetailInOrder