import { Button, Pagination, Popconfirm, Skeleton, Spin, message } from "antd"
import { useGetAllBookQuery, useRemoveBookMutation } from "../../api/book"
import { useEffect, useState } from "react"
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { useGetAllCategoryQuery } from "../../api/category";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllPromotionQuery } from "../../api/promotion";
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const ListBook = () => {
    const navigate = useNavigate();
    const [page, setpage] = useState(1)
    const [messageApi, contextHolder] = message.useMessage();
    const [datas, setdata]: any = useState([])
    const [isLoadings, setisloading]: any = useState(true)
    const { data, isLoading, refetch } = useGetAllBookQuery(page)

    useEffect(() => {
        refetch(); // Gọi lại truy vấn API bằng cách sử dụng refetch
    }, [page, refetch]);
    const { data: categorydata } = useGetAllCategoryQuery('')
    const { data: promotion } = useGetAllPromotionQuery('')
    const [remove, { isLoading: removeLoading }] = useRemoveBookMutation()
    const handleRemove = (id: any) => {
        remove(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: 'loading',
                    content: 'Đang chuyển book sang thùng rác...',
                    duration: 2,
                })
                    .then(() => message.success('Chuyển book sang thùng rác thành công!', 2))
                    .then(() => message.info('Danh sách book đã được cập nhập  lại!', 2));

            })

    }
    return (
        <>
            {contextHolder}
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Danh Sách Book</h5>
                    <div className="card-body">
                        <div className="table-responsive text-nowrap">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên Sách</th>
                                        <th>Ảnh Sách</th>
                                        <th>Giá Sách</th>
                                        <th>Nhà Cung Cấp</th>
                                        <th>Năm Xuất Bản</th>
                                        <th>Danh Mục</th>
                                        <th>Tác Giả</th>
                                        <th>Khuyến Mãi</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                {isLoading ? <Spin indicator={antIcon} style={{ marginTop: '30px', marginLeft: '448%' }} /> : <tbody>
                                    {data?.data?.map((data: any) => {
                                        const categoryName = categorydata?.category?.find((category: any) => category.id === data?.category_id)?.name;
                                        const promotionName = promotion?.data?.find((dataa: any) => dataa.id === data?.promorions_id)?.name;
                                        return (<>
                                            {isLoading ? <Skeleton /> : <tr>
                                                <td>{data?.id}</td>
                                                <td>
                                                    <i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{data?.name}</strong>
                                                </td>
                                                <td>
                                                    <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                        <li
                                                            data-bs-toggle="tooltip"
                                                            data-popup="tooltip-custom"
                                                            data-bs-placement="top"
                                                            className="avatar avatar-xs pull-up"
                                                            title="Lilian Fuller"
                                                        >
                                                            <img src={data?.image} />
                                                        </li>

                                                    </ul>
                                                </td>
                                                <td>{data?.price}</td>
                                                <td>{data?.nha_cung_cap}</td>
                                                <td>{data?.nha_xuat_ban}</td>
                                                <td>{categoryName}</td>
                                                <td>{data?.tac_gia}</td>
                                                <td>{promotionName}</td>
                                                <td>
                                                    <Link to={`${data?.id}/edit`}> <button type="button" className="btn btn-outline-success" style={{ fontSize: '12px' }}>Edit</button></Link>
                                                    <span>  </span>
                                                    <Popconfirm
                                                        title="Delete the task"
                                                        description="Are you sure to delete this book?"
                                                        okText="Yes"
                                                        cancelText="No"
                                                        onConfirm={() => handleRemove(data?.id)}
                                                    >
                                                        <Button className="btn btn-outline-danger" style={{ fontSize: '12px' }}>Delete</Button>
                                                    </Popconfirm>
                                                </td>
                                            </tr>}

                                        </>)
                                    })}


                                </tbody>
                                }

                            </table>

                        </div>
                        <div style={{ display: 'flex' }}>
                            <Pagination pageSize={1}
                                total={data?.totalPages}
                                // current={currentPage}
                                onChange={(page: any) => setpage(page)} style={{ marginTop: "20px", width: "80%" }} />
                            <Link to="recyclebin" style={{ marginLeft: '80%' }}>
                                <DeleteOutlined style={{ float: "right", marginLeft: '80%', marginTop: "20px", fontSize: "1em" }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListBook