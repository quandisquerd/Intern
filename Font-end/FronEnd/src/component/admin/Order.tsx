import { Spin } from "antd"
import { useGetAllOrderQuery } from "../../api/order"
import OrderDetailInOrder from "./OrderDetailInOrder"
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const ListOrder = () => {
    const { data: orders, isLoading } = useGetAllOrderQuery('')
    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Lisr Order</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <caption className="ms-4">
                                List Order
                            </caption>
                            <thead>
                                <tr style={{textAlign:'center'}}>
                                    <th>STT</th> 
                                    <th>Người Đặt Hàng </th>
                                    <th>Ngày Đặt Hàng</th>
                                   
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {isLoading ? <Spin indicator={antIcon} style={{ marginTop: '30px', marginLeft: '260%' }} />:  <tbody>
                                {orders?.data?.map((data: any,index:any) => (<OrderDetailInOrder data={data} index={index}/>))}


                            </tbody>}
                           
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListOrder