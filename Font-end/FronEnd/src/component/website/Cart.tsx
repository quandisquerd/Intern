
import { useEffect, useState } from "react"
import { useGetAllCartQuery } from "../../api/cart"

import Cart_detail from "./Cart_detail"
import { Button, Skeleton } from "antd"
import { Link } from "react-router-dom"
const Cart = ({ onTotal }: any) => {
    const user = JSON.parse(localStorage.getItem('user')!)
    const token = user?.accesstoken
    const { data, isLoading } = useGetAllCartQuery(token)
    const [totalSum, setTotalSum] = useState(0); // Tạo biến để lưu tổng
    const [check, setcheck] = useState(false);
    let toal = 0
    const handleTotalChange = async (newTotal: number) => {
        toal += newTotal
        setTotalSum(toal);

    };
    console.log(data);

    useEffect(() => {
        if (!data?.data || data?.data?.length == 0) {
            setcheck(true)
        } else if (data?.data?.length > 0) {
            setcheck(false)
        }
    }, [data])
    const handleTotal = (total: any) => {
        onTotal(total, data)
    }
    return (
        <>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Shopping Cart</h4>
                                <div className="breadcrumb__links">
                                    <a href="./index.html">Home</a>
                                    <a href="./shop.html">Shop</a>
                                    <span>Shopping Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="shopping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Books</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? <Skeleton /> : <>  {data?.data?.map((data: any) => (<Cart_detail key={data?.id} id={data?.id} data={data?.book_id} quantity={data?.quantity} onTotalChange={handleTotalChange} />))}</>}

                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="continue__btn">
                                        <a href="#">Continue Shopping</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4">

                            <div className="cart__total">
                                <h6>Cart total</h6>
                                <ul>
                                    <li>Subtotal <span>$ {totalSum}</span></li>

                                </ul>
                                <Button className="primary-btn" style={{ height: '60px' }} onClick={() => handleTotal(totalSum)} disabled={check}> <Link to={'/checkout'}> Proceed to checkout</Link></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart