import { Link } from "react-router-dom"
import { useGetAllCategoryQuery } from "../../api/category"
import { useGetAllDiscountQuery } from "../../api/discount"


const SearchBook = ({ data }: any) => {
    const { data: category } = useGetAllCategoryQuery('')
    const { data: discounts } = useGetAllDiscountQuery('')
    return (
        <>
            <>
                <section className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__text">
                                    <h4>Search</h4>
                                    <div className="breadcrumb__links">
                                        <a href="./index.html">Home</a>
                                        <span>Search</span>
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
                                                <p>Showing  {data?.data?.length} results</p>
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
                                <div className="row">
                                    {data?.data?.map((data: any) => {
                                        const discountName = discounts?.data?.find((datas: any) => datas.id == data?.promorions_id)?.discount;
                                        const priceDiscount = Number((data?.price) * (discountName / 100))
                                        const total = Number(data?.price - priceDiscount)
                                        return (<>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <Link to={`/book/${data?.id}`}>
                                                    <div className="product__item">

                                                        <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${data?.image})` }}>
                                                            {discountName ? <span className="label" style={{ color: "white", background: "red" }}>-{discountName}%</span> : ''}

                                                            <ul className="product__hover">
                                                                <li><a href="#"><img src="https://themewagon.github.io/malefashion/img/icon/heart.png" alt="" /></a></li>
                                                                <li><a href="#"><img src="https://themewagon.github.io/malefashion/img/icon/compare.png" alt="" /></a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="product__item__text">
                                                            <h6>{data?.name}</h6>
                                                            <a href="#" className="add-cart">+ Add To Cart</a>
                                                            {total ? <div style={{ display: 'flex' }}><h5 style={{ marginRight: '10px', color: "#888", textDecoration: "line-through" }}>{data.price} $</h5><h5 style={{ color: 'red' }}>{total}$</h5></div> : <h5>{data?.price}</h5>}

                                                            <div className="product__color__select">
                                                                <label htmlFor="pc-4">
                                                                    <input type="radio" id="pc-4" />
                                                                </label>
                                                                <label className="active black" htmlFor="pc-5">
                                                                    <input type="radio" id="pc-5" />
                                                                </label>
                                                                <label className="grey" htmlFor="pc-6">
                                                                    <input type="radio" id="pc-6" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    )
}

export default SearchBook