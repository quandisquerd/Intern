import { useState } from "react"
import { useGetAllCategoryQuery } from "../../api/category"
import { useGetAllDiscountQuery } from "../../api/discount"
import { useGetAllBookQuery } from "../../api/book"
import { Button, Pagination, Skeleton, message } from "antd"
import { Link } from "react-router-dom"
import './shop.css'
import { useAddToCartMutation } from "../../api/cart"

const Shop = () => {
    const { data: category } = useGetAllCategoryQuery('')
    const { data: discounts } = useGetAllDiscountQuery('')
    const [page, setpage] = useState(1)
    const { data, isLoading, refetch } = useGetAllBookQuery(page)
    const [messageApi, contextHolder] = message.useMessage()
    const [addtocart] = useAddToCartMutation()
    const user = JSON.parse(localStorage.getItem('user')!)


    const AddToCart = (value: any) => {
        if (!user) {
            messageApi.open({
                type: 'error',
                content: 'Bạn cần đăng nhập để thêm vào giỏ hàng!'
            })
        } else {
            const data1 = {
                book_id: value,
                quantity: 1
            }
            const token = user?.accesstoken
            const all = { data: data1, token: token }

            addtocart(all)
                .unwrap()
                .then(() => {
                    messageApi.open({
                        type: 'loading',
                        content: 'Đang thêm vào giỏ hàng...',
                        duration: 2,
                    })
                        .then(() => message.success('Thêm vào giỏ hàng thành công!', 2))
                        .then(() => message.info('Giỏ hàng đã được cập nhập lại!', 2));
                })
                .catch(({ data }: any) => {
                    messageApi.open({
                        type: 'error',
                        content: data?.message
                    })
                })
        }

    }
    const skeletonBlocks = Array.from({ length: 12 }, (_, index) => (
        <div key={index} className="skeleton-block">
            <Skeleton width={300} height={350} />
        </div>
    ));
    return (
        <>
            {contextHolder}
            {isLoading ? <div className="skeleton-container">
                {skeletonBlocks}
            </div> : <><section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Shop</h4>
                                <div className="breadcrumb__links">
                                    <a href="./index.html">Home</a>
                                    <span>Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                <section className="shop spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="shop__sidebar">
                                    <div className="shop__sidebar__search">
                                        <form action="#">
                                            <input type="text" placeholder="Search..." />
                                            <button type="submit"><span className="icon_search"></span></button>
                                        </form>
                                    </div>
                                    <div className="shop__sidebar__accordion">
                                        <div className="accordion" id="accordionExample">
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
                                                </div>
                                                <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="shop__sidebar__categories">
                                                            <ul className="nice-scroll">
                                                                {category?.category?.map((data: any) => {
                                                                    return (<>
                                                                        <li><a >{data?.name}</a></li>
                                                                    </>)
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="shop__product__option">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="shop__product__option__left">
                                                <p>Showing {data?.data?.length} results</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="shop__product__option__right">
                                                <p>Sort by Price:</p>
                                                <select>
                                                    <option value="">Low To High</option>
                                                    <option value="">$0 - $55</option>
                                                    <option value="">$55 - $100</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ width: '100%' }}>
                                    {data?.data?.map((data: any) => {
                                        const discountName = discounts?.data?.find((datas: any) => datas.id == data?.promorions_id)?.discount;
                                        const priceDiscount = Number((data?.price) * (discountName / 100))
                                        const total = Number(data?.price - priceDiscount)
                                        return (<>
                                            <div className="col-lg-4 col-md-6 col-sm-6 quan" style={{ paddingTop: '20px', paddingBottom: '20px', marginTop: '5px' }}>

                                                <div className="product__item">
                                                    <Link to={`/book/${data?.id}`}>
                                                        <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${data?.image})` }}>
                                                            {discountName ? <span className="label" style={{ color: "white", background: "red" }}>-{discountName}%</span> : ''}

                                                            <ul className="product__hover">
                                                                <li><a href="#"><img src="https://themewagon.github.io/malefashion/img/icon/heart.png" alt="" /></a></li>
                                                                <li><a href="#"><img src="https://themewagon.github.io/malefashion/img/icon/compare.png" alt="" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="product__item__text">
                                                            <h6>{data?.name}</h6>

                                                            {total ? <div style={{ display: 'flex' }}><h5 style={{ marginRight: '10px', color: "#888", textDecoration: "line-through" }}>{data.price} $</h5><h5 style={{ color: 'red' }}>{total}$</h5></div> : <h5>{data?.price}</h5>}


                                                        </div> </Link><a className="add-cart" style={{ marginLeft: '50%' }}> <Button onClick={() => AddToCart(data?.id)}>+ Add To Cart</Button></a>
                                                </div>


                                            </div>
                                        </>)
                                    })}
                                </div>
                                {/* <div className="row">
                                <div className="col-lg-12">
                                    <div className="product__pagination">
                                        <a className="active" href="#">1</a>
                                        <a href="#">2</a>
                                        <a href="#">3</a>
                                        <span>...</span>
                                        <a href="#">21</a>
                                    </div>
                                </div>
                            </div> */}
                                <Pagination pageSize={1}
                                    total={data?.totalPages}
                                    // current={currentPage}
                                    onChange={(page: any) => setpage(page)} style={{ marginTop: "20px", width: "80%" }} />
                            </div>
                        </div>
                    </div>
                </section></>}

        </>
    )
}

export default Shop