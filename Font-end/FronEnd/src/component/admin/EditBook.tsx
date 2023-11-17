import { DeleteOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, Select, Upload, UploadProps, message } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "../../api/category";
import { useAddBookMutation, useGetOneBookQuery, useUpdateBookMutation } from "../../api/book";
import { useNavigate, useParams } from "react-router-dom";
import { pause } from "../../util/pause";

const EditBook = () => {
    const [form] = Form.useForm()
    const [image, setimage] = useState('')
    const [cat, setcat] = useState()
    const { data: categorydata } = useGetAllCategoryQuery('')
    const [add, { isLoading: loading }] = useAddBookMutation()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: dataone } = useGetOneBookQuery(id)
    console.log(dataone?.data[0]);
    const [currentImage, setCurrentImage] = useState('');
    const [update, { isLoading: updateding }] = useUpdateBookMutation()
    useEffect(() => {
        form.setFieldsValue(dataone?.data[0])
        setCurrentImage(dataone?.data[0].image)
    }, [dataone?.data[0]])
    const props: UploadProps = {
        action: 'https://api.cloudinary.com/v1_1/dw6wgytc3/image/upload',
        onChange({ file }: any) {
            if (file.status !== 'uploading') { }
            setimage(file?.response?.secure_url);
            setCurrentImage(file?.response?.secure_url)
        },
        data: {
            upload_preset: 'demo_upload',
            folder: 'DUAN',
        },
    };
    const onFinish = (value: any) => {
        const data = {
            ...value,
            id:id,
            image: currentImage,
        }        
        update(data)
            .unwrap()
            .then(async () => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã sửa book thành công đợi 2s để trở về trang danh sách book!'
                })
                await pause(2000)
                navigate('/admin/book')
            })
            .catch(({ data }: any) => {
                messageApi.open({
                    type: 'error',
                    content: data?.message
                })
            })

    }
    const checkName = (_: any, value: any) => {
        if (value.trim() === '') {
            return Promise.reject('Bạn không được nhập full space!')
        } else {
            return Promise.resolve()
        }
    }
    const checkPrice = (_: any, value: any) => {
        if (value <= 0) {
            return Promise.reject('Bạn không được nhập số âm!')
        } else {
            return Promise.resolve()
        }
    }
    const checkUpload = () => {
        // Kiểm tra nếu không có ảnh nào và imageUploaded là false, báo lỗi
        if (!currentImage) {
            return Promise.reject('Vui lòng chọn một tệp ảnh!');
        }
        return Promise.resolve();
    };
    const checkYear = (_: any, value: number) => {
        if (value < 1848 || value > 2023) {
            return Promise.reject('Giá trị phải nằm trong khoảng từ 1848 đến 2023!');
        }
        return Promise.resolve();
    };
    const checkCat = (_: any, { value }: any) => {
        if (value === '0') {
            return Promise.reject('Vui lòng chọn 1 danh mục!');
        }
        return Promise.resolve();
    };




    const handleRemoveImage = () => {
        // Xóa ảnh hiện tại bằng cách đặt currentImage thành null
        setCurrentImage('');
        // Đặt giá trị của trường 'image' trong form thành null để xóa dữ liệu ảnh
        form.setFieldsValue({ image: null });
    };
    const handleChangeImage = () => {
        // Khi tải lên thành công, cập nhật currentImage
        setCurrentImage(image);

    };
    return (
        <>
            {contextHolder}
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card mb-4">
                    <h5 className="card-header">Thêm Mới Book</h5>
                    <Form form={form} name="basic" className="card-body" onFinish={onFinish}
                        autoComplete="off">
                        <div className="mb-3 row">
                            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">Tên Sách</label>
                            <Form.Item className="col-md-10" name="name" rules={[{ required: true, message: 'Không được để trống tên sách!' }, { min: 3, message: 'tên sách không được ít hơn 3 ký tự!' }, { validator: checkName }]}>
                                <Input className="form-control" placeholder="Tên Sách..." id="html5-text-input" />
                            </Form.Item>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-search-input" className="col-md-2 col-form-label">Image</label>
                            <Form.Item name="image" className="col-md-10" rules={[{ validator: checkUpload }]} validateTrigger={['onChange', 'onBlur']} >
                                <Upload.Dragger multiple accept=".jpg,.png" {...props} >
                                    <Button icon={<UploadOutlined />} >Upload</Button>
                                </Upload.Dragger>

                                <Image width={200} src={currentImage} />
                                {currentImage ? <Button icon={<DeleteOutlined />} onClick={handleRemoveImage}>
                                    Xóa ảnh
                                </Button> : ""}

                            </Form.Item>

                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-email-input" className="col-md-2 col-form-label">Giá Sách</label>
                            <Form.Item className="col-md-10" name="price" rules={[{ required: true, message: 'Không được để trống price!' }, { validator: checkPrice }]}>
                                <Input className="form-control" type="number" placeholder="123" id="html5-number-input" />
                            </Form.Item>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">Nhà Cung Cấp</label>
                            <Form.Item className="col-md-10" name="nha_cung_cap" rules={[{ required: true, message: 'Không được để trống nhà cung cấp!' }, { min: 3, message: 'nhà cung cấp không được ít hơn 3 ký tự!' }, { validator: checkName }]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="NCC"
                                    id="html5-url-input"

                                />
                            </Form.Item>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">Nhà Xuất Bản</label>
                            <Form.Item className="col-md-10" name="nha_xuat_ban" rules={[{ required: true, message: 'Không được để trống nhà xuất bản!' }, { min: 3, message: 'nhà xuất bản không được ít hơn 3 ký tự!' }, { validator: checkName }]}>
                                <Input className="form-control" type="text" placeholder="NXB" id="html5-tel-input" />
                            </Form.Item>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">Mô Tả Sách</label>
                            <Form.Item className="col-md-10" name="description" rules={[{ required: true, message: 'Không được để trống mô tả sách!' }, { min: 3, message: 'mô tả sách không được ít hơn 3 ký tự!' }, { validator: checkName }]}>
                                <TextArea className="form-control" placeholder="Description" id="html5-password-input" />
                            </Form.Item>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-number-input" className="col-md-2 col-form-label">Tác Giả</label>
                            <Form.Item className="col-md-10" name="tac_gia" rules={[{ required: true, message: 'Không được để trống tác giả!' }, { min: 3, message: 'tác giả không được ít hơn 3 ký tự!' }, { validator: checkName }]}>
                                <Input className="form-control" type="text" placeholder="Tác Giả" id="html5-number-input" />
                            </Form.Item>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-datetime-local-input" className="col-md-2 col-form-label">Năm Xuất Bản</label>
                            <Form.Item className="col-md-10" name="nam_xuat_ban" rules={[{ required: true, message: 'Không được để trống năm xuất bản!' }, { validator: checkYear }]}>
                                <Input
                                    className="form-control"
                                    type="number"
                                    min="1848" // Năm tối thiểu
                                    max="2023" // Năm tối đa
                                    step="1"    // Bước là 1 năm
                                    placeholder="2000"
                                    id="html5-datetime-local-input"

                                />
                            </Form.Item>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="html5-datetime-local-input" className="col-md-2 col-form-label">Danh Mục</label>
                            <Form.Item name="category_id" className="col-md-10" rules={[{ validator: checkCat }]} >
                                <Select style={{ width: '100%' }} defaultValue="0" onChange={(e: any) => setcat(e)}>
                                    <Option value="0">Chọn 1 danh mục</Option>
                                    {categorydata?.category?.map((data: any) => {
                                        return (
                                            <option value={data?.id}>{data?.name}</option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </div>

                        <Button htmlType="submit" className="btn btn-outline-primary" style={{ height: '40px', marginTop: '20px' }}>{updateding ? 'Đang Sửa Book' : 'Sửa Book'}</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EditBook