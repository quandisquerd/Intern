
import { Pagination, Popconfirm, Skeleton, Spin, message } from "antd"

import { useState } from "react"

import { useGetAllRecyclebinQuery, useRemoveRecyclebinMutation, useRestoreBookMutation } from "../../api/recyclebin";
import { LoadingOutlined } from "@ant-design/icons";
import { pause } from "../../util/pause";
import { useNavigate } from "react-router-dom";
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
import { useQueryClient } from 'react-query';

// const queryClient = useQueryClient();
const RecycleBin = () => {
    const [page, setpage] = useState(1)
    const [messageApi, contextHolder] = message.useMessage();
    const { data: recyclebin, isLoading: loading } = useGetAllRecyclebinQuery(page)
    const [restore, { isLoading: restoreding }] = useRestoreBookMutation()
    const navigate = useNavigate()
    const [remove, { isLoading: removeing }] = useRemoveRecyclebinMutation()
    const handleRemove = (id: any) => {
        remove(id)
            .unwrap()
            .then(async() => {
                messageApi.open({
                    type: 'loading',
                    content: 'Đang xóa book khỏi thùng rác...',
                }),
                await pause(1000)
            })
            .then(() => message.success('Xóa book khỏi thùng rác thành công!', 2))
            .then(() => message.info('Danh sách book trong thùng rác đã được cập nhập  lại!', 2))
            .catch(({ data }: any) => {
                messageApi.open({
                    type: 'error',
                    content: data?.message
                })
            })
    }
    const handleRestore = (id: any) => {
        restore(id)
            .unwrap()
            .then(async () => {
                // await queryClient.invalidateQueries('getAllRecyclebin');
                messageApi.open({
                    type: 'loading',
                    content: 'Đang khôi phục book...',

                })
                await pause(2000)
                navigate('/admin/book')
            })
            .then(() => message.success('Khôi phục book thành công!', 1))
            .then(() => message.info('Danh sách book đã được cập nhập  lại!', 1))
            .catch(({ data }: any) => {
                messageApi.open({
                    type: 'error',
                    content: data?.message
                })
            })
    }
    return (
        <>
            {contextHolder}
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Thùng Rác</h5>
                    <div className="card-body">
                        <div className="table-responsive text-nowrap">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Người Xóa Sách</th>
                                        <th>Tên Sách</th>
                                        <th>Ảnh Sách</th>
                                        <th>Giá Sách</th>
                                        <th>Nhà Cung Cấp</th>
                                        <th>Năm Xuất Bản</th>
                                        <th>Tác Giả</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                {loading ? <Spin indicator={antIcon} style={{ marginTop: '30px', marginLeft: '280%' }} /> : <tbody>
                                    {recyclebin?.data?.map((data: any) => {
                                        return (<>
                                            {loading ? <Skeleton /> : <tr>
                                                <td>{data?.id_user}</td>
                                                <td>
                                                    <i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{data?.books?.name}</strong>
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
                                                            <img src={data?.books?.image} />
                                                        </li>

                                                    </ul>
                                                </td>
                                                <td>{data?.books?.price}</td>
                                                <td>{data?.books?.nha_cung_cap}</td>
                                                <td>{data?.books?.nha_xuat_ban}</td>
                                                <td>{data?.books?.tac_gia}</td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-success" style={{ fontSize: '12px' }} onClick={() => handleRestore(data?.id)}>Restore</button>
                                                    <span>  </span>
                                                    <Popconfirm
                                                        title="Delete the task"
                                                        description="Are you sure to delete this book?"
                                                        okText="Yes"
                                                        cancelText="No"
                                                        onConfirm={() => handleRemove(data?.id)}
                                                    >
                                                        <button type="button" className="btn btn-outline-danger" style={{ fontSize: '12px' }} >Delete</button>
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
                                total={recyclebin?.totalPages}
                                // current={currentPage}
                                onChange={(page: any) => setpage(page)} style={{ marginTop: "20px", width: "80%" }} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecycleBin