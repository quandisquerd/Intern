import { Link, useParams } from "react-router-dom"
import { useGetOneBookQuery, useRelatedBookMutation } from "../../api/book"
import { useGetAllCategoryQuery } from "../../api/category"
import { useGetAllDiscountQuery } from "../../api/discount"
import { Input } from "antd"
import { useEffect, useState } from "react"

const ShopDetail = () => {
    const { id } = useParams()
    const [expanded, setExpanded] = useState(false);
    const { data, isLoading } = useGetOneBookQuery(id)
    const { data: category } = useGetAllCategoryQuery('')
    const { data: discounts } = useGetAllDiscountQuery('')
    const discountName = discounts?.data?.find((datas: any) => datas.id == data?.data[0]?.promorions_id)?.discount;
    const priceDiscount = Number((data?.data[0]?.price) * (discountName / 100))
    const total = Number(data?.data[0]?.price - priceDiscount)
    const [relate, setrelate] = useState<any>([])
    const [related] = useRelatedBookMutation()
    useEffect(() => {
        const category = {
            category_id: data?.data[0]?.category_id,
            book_id: id
        }
        console.log(category);
        
        related(category)
            .then((datas: any) => {
                setrelate(datas)
            })
    }, [relate])
    console.log(relate);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };
    const handleReset = () => {
        setExpanded(false);
    };
    const handleLinkClick = () => {
        // Cuộn trang lên đầu bằng cách chuyển tới phần đầu trang
        const topElement = document.getElementById('top');
        if (topElement) {
            topElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <div id="top"></div>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Shop</h4>
                                <div className="breadcrumb__links">
                                    <a >Home /</a>
                                    <span>Shop /</span>
                                    <span>Shop Detail</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="shop-details" style={{ display: 'flex', padding: '40px' }}>
                <div className="product__details__pic" style={{ float: 'left', width: '40%', background: '#FFFFFF' }}>
                    <div className="container">
                        <div className="row" style={{ padding: '30px', margin: '0 auto', width: '100%', marginLeft: '20%', marginTop: '70px' }}>
                            <img src={data?.data[0]?.image} alt="" style={{ width: '70%' }} />
                        </div>
                    </div>
                </div>
                <div className="product__details__content" style={{ float: 'right', marginTop: '80px', display: 'block', width: '60%' }}>

                    <div style={{ padding: '50px', marginLeft: '20%' }} >
                        <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>{data?.data[0]?.name}</h2>
                        {total ? <div style={{ display: 'flex' }}><h5 style={{ marginRight: '10px', color: "#888", textDecoration: "line-through" }}>{data?.data[0]?.price} $</h5><h5 style={{ color: 'red' }}>{total}$</h5></div> : <h5>{data?.data[0]?.price} $</h5>}

                        {/* <p style={{ marginTop: '20px' }}>{data?.data[0]?.description}</p> */}
                        <p style={{ marginTop: '20px', width: '70%' }}>
                            {expanded ? data?.data[0]?.description : data?.data[0]?.description.slice(0, 150)}
                            {!expanded && data?.data[0]?.description.length > 150 && (
                                <span onClick={toggleExpansion} style={{ color: 'blue', cursor: 'pointer' }}>
                                    {' '}
                                    Xem thêm
                                </span>
                            )}
                            {expanded && (
                                <span onClick={handleReset} style={{ color: 'blue', cursor: 'pointer' }}>
                                    {' '}
                                    Thu gọn
                                </span>
                            )}
                        </p>

                        <div className="product__details__cart__option">
                            <div className="quantity">
                                <Input type="number" defaultValue="1" style={{ marginTop: '20px', width: '100px' }} />
                            </div>
                            <a href="#" className="primary-btn" style={{ marginTop: '20px', width: '200px' }}>add to cart</a>
                        </div>


                    </div>

                </div>

            </section>
            <div className="row" style={{ padding: '100px' }}>
                <div className="col-lg-12">
                    <div className="product__details__tab">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tabs-5"
                                    role="tab">Comment</a>
                            </li>

                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-5" role="tabpanel">
                                <div className="product__details__tab__content">
                                    <p className="note">Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                        solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis
                                        ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo
                                        pharetras loremos.</p>
                                    <div className="product__details__tab__content__item">
                                        <h5>Products Infomation</h5>
                                        <p>A Pocket PC is a handheld computer, which features many of the same
                                            capabilities as a modern PC. These handy little devices allow
                                            individuals to retrieve and store e-mail messages, create a contact
                                            file, coordinate appointments, surf the internet, exchange text messages
                                            and more. Every product that is labeled as a Pocket PC must be
                                            accompanied with specific software to operate the unit and must feature
                                            a touchscreen and touchpad.</p>
                                        <p>As is the case with any new technology product, the cost of a Pocket PC
                                            was substantial during it’s early release. For approximately $700.00,
                                            consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                            These days, customers are finding that prices have become much more
                                            reasonable now that the newness is wearing off. For approximately
                                            $350.00, a new Pocket PC can now be purchased.</p>
                                    </div>
                                    <div className="product__details__tab__content__item">
                                        <h5>Material used</h5>
                                        <p>Polyester is deemed lower quality due to its none natural quality’s. Made
                                            from synthetic materials, not natural like wool. Polyester suits become
                                            creased easily and are known for not being breathable. Polyester suits
                                            tend to have a shine to them compared to wool and cotton suits, this can
                                            make the suit look cheap. The texture of velvet is luxurious and
                                            breathable. Velvet is a great choice for dinner party jacket and can be
                                            worn all year round.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="related spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3 className="related-title">Related Product</h3>
                        </div>
                    </div>
                    <div className="row">
                        {relate?.data?.data?.map((data: any) => {
                            const discountName = discounts?.data?.find((datas: any) => datas.id == data?.promorions_id)?.discount;
                            const priceDiscount = Number((data?.price) * (discountName / 100))
                            const total = Number(data?.price - priceDiscount)
                            return (<>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                                    <Link to={`/book/${data?.id}`} onClick={handleLinkClick}>
                                        <div className="product__item">
                                            <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${data?.image})` }}>
                                                {discountName ? <span className="label" style={{ color: "white", background: "red" }}>-{discountName}%</span> : ''}
                                                <ul className="product__hover">
                                                    <li><a href="#"><img src="img/icon/heart.png" alt="" /></a></li>
                                                    <li><a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                                                    <li><a href="#"><img src="img/icon/search.png" alt="" /></a></li>
                                                </ul>
                                            </div>
                                            <div className="product__item__text">
                                                <h6>{data?.name}</h6>
                                                <a href="#" className="add-cart">+ Add To Cart</a>

                                                {total ? <div style={{ display: 'flex' }}><h5 style={{ marginRight: '10px', color: "#888", textDecoration: "line-through" }}>{data.price} $</h5><h5 style={{ color: 'red' }}>{total}$</h5></div> : <h5>{data?.price}</h5>}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </>)
                        })}
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopDetail