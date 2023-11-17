
import { Carousel } from "antd"
import { useGetDiscountQuery, useGetOutstanQuery } from "../../api/book"
import Skeleton from 'react-loading-skeleton';
import './loading.css'
import { useGetAllDiscountQuery } from "../../api/discount";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { data, isLoading } = useGetOutstanQuery('')
    const { data: discount, isLoading: discounting } = useGetDiscountQuery('')
    const { data: discounts } = useGetAllDiscountQuery('')
    const skeletonBlocks = Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="skeleton-block">
            <Skeleton width={300} height={350} />
        </div>
    ));
    return (
        <>
            <Carousel autoplay>
                <div>
                    <img style={{ width: '100%' }} src="https://cdn0.fahasa.com/media/magentothem/banner7/BookBTST1508_T9_Banner_840x320.jpg" alt="Slide 1" />
                </div>
                <div>

                    <img style={{ width: '100%' }} src="https://cdn0.fahasa.com/media/magentothem/banner7/GalaxyT9_840x320.png" alt="Slide 2" />
                </div>
                <div>

                    <img style={{ width: '100%' }} src="https://cdn0.fahasa.com/media/magentothem/banner7/KDKS_Mainbanner_Slide_840x320.jpg" alt="Slide 3" />
                </div>
            </Carousel>
            <section className="product spad" style={{ marginTop: '60px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Latest News</span>
                                <h2>Sách Nổi Bật</h2>
                            </div>
                        </div>
                    </div>
                    {isLoading ? <div className="skeleton-container">
                        {skeletonBlocks}
                    </div> : <div className="row product__filter">
                        {data?.data?.map((data: any) => {
                            return (
                                <>
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals"> <Link to={`/book/${data?.id}`}>
                                        <div className="product__item">
                                            <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${data?.image})` }}>
                                            </div>
                                            <div className="product__item__text">
                                                <h6>{data?.name}</h6>
                                                <a href="#" className="add-cart">+ Add To Cart</a>
                                                <h5>{data.price}</h5>
                                            </div>
                                        </div></Link >
                                    </div>
                                </>
                            )
                        })}
                    </div>}
                    <div className="row" style={{ marginTop: '200px' }}>
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Latest News</span>
                                <h2>Sách Khuyến Mãi</h2>
                            </div>
                        </div>
                    </div>
                    {discounting ? <div className="skeleton-container">
                        {skeletonBlocks}
                    </div> :
                        <div className="row product__filter">
                            {discount?.data?.map((data: any) => {
                                const discountName = discounts?.data?.find((datas: any) => datas.id == data?.promorions_id)?.discount;
                                const priceDiscount = Number((data?.price) * (discountName / 100))
                                const total = Number(data?.price - priceDiscount)
                                return (
                                    <>
                                        <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                                            <Link to={`/book/${data?.id}`}>
                                                <div className="product__item">
                                                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${data?.image})` }}>
                                                        <span className="label" style={{ color: "white", background: "red" }}>-{discountName}%</span>
                                                        <ul className="product__hover">
                                                            <li><a href="#"><img src="https://themewagon.github.io/malefashion/img/icon/heart.png" alt="" /></a></li>
                                                            <li><a href="#"><img src="https://themewagon.github.io/malefashion/img/icon/compare.png" alt="" /></a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="product__item__text">
                                                        <h6>{data?.name}</h6>
                                                        <a href="#" className="add-cart">+ Add To Cart</a>
                                                        <div style={{ display: 'flex' }}><h5 style={{ marginRight: '10px', color: "#888", textDecoration: "line-through" }}>{data.price} $</h5><h5 style={{ color: 'red' }}>{total}$</h5></div>

                                                    </div>
                                                </div></Link>
                                        </div>
                                    </>
                                )
                            })}
                        </div>}
                </div>
            </section >



            <section className="latest spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Latest News</span>
                                <h2>Fashion New Trends</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic set-bg" data-setbg="img/blog/blog-1.jpg"></div>
                                <div className="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 16 February 2020</span>
                                    <h5>What Curling Irons Are The Best Ones</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic set-bg" data-setbg="img/blog/blog-2.jpg"></div>
                                <div className="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 21 February 2020</span>
                                    <h5>Eternity Bands Do Last Forever</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic set-bg" data-setbg="img/blog/blog-3.jpg"></div>
                                <div className="blog__item__text">
                                    <span><img src="img/icon/calendar.png" alt="" /> 28 February 2020</span>
                                    <h5>The Health Benefits Of Sunglasses</h5>
                                    <a href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage