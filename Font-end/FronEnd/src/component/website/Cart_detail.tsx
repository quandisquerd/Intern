import React, { useEffect, useState } from 'react'
import { usePostOneBookMutation } from '../../api/book';
import { useGetAllDiscountQuery } from '../../api/discount';
import { Input, Skeleton, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useAddToCartMutation, useRemoveCartMutation } from '../../api/cart';

type Props = {
    data: any, quantity: any, onTotalChange: any, id: any
};

const Cart_detail: React.FC<Props> = ({ data, quantity, onTotalChange, id }) => {
    const user = JSON.parse(localStorage.getItem('user')!)
    const [postbook, { isLoading }] = usePostOneBookMutation()
    const { data: discounts } = useGetAllDiscountQuery('')
    const [books, setbooks] = useState<any>({})
    useEffect(() => {
        postbook({ book_id: data })
            .unwrap()
            .then((data) => {
                setbooks(data)
            })
    }, [])
    const discountName = discounts?.data?.find((datas: any) => datas.id == books?.data?.promorions_id)?.discount;
    const priceDiscount = Number((books?.data?.price) * (discountName / 100))
    const total = Number(books?.data?.price - priceDiscount)

    const [value, setvalue] = useState<any>()
    const [totalss, settotals] = useState<any>(0)
    const [addtocart] = useAddToCartMutation()
    const [removeCart] = useRemoveCartMutation()
    const [messageApi, contextHolder] = message.useMessage()
    useEffect(() => {
        if (quantity && books?.data?.price) {
            if (total) {
                settotals(total * quantity);
                onTotalChange(totalss)
            } else {
                const newData = Number(quantity * books.data.price);
                settotals(newData);
                onTotalChange(totalss)
            }
        }
    },);
    const [checks, setchecks] = useState(false)
    const handleTotal = async (totals: any) => {
        const soluong1: any = (totals.target.value - quantity)
        setchecks(true)
        if (soluong1 !== 0) {
            const data1 = {
                book_id: books?.data?.id,
                quantity: soluong1
            }
            console.log(data1);
            const token = user?.accesstoken
            const all = { data: data1, token: token }
            console.log(all);
            addtocart(all)
                .unwrap()
                .then(() => {
                    setchecks(false)
                })
        }
    }
    const handleBlur = () => {
        const newTotal = data?.data?.price * quantity;
        setvalue(newTotal);
    };
    const handleRemove = (id: any) => {
        console.log(id);
        removeCart(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã xóa book khỏi giỏ hàng!'
                })
            })
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
            {isLoading ? <Skeleton /> : <>
                <tr>
                    <td className="product__cart__item" style={{ display: 'flex' }}>
                        <div className="product__cart__item__pic" style={{ width: '30%' }}>
                            <img src={books?.data?.image} alt="" style={{ width: '70%' }} />
                        </div>
                        <div className="product__cart__item__text" style={{ width: '50%' }}>
                            <h6 style={{
                                color: '#111111',
                                fontSize: '15px',
                                fontWeight: '400',
                                marginBottom: '10px'
                            }}>{books?.data?.name}</h6>
                            {total ? <h5 style={{ color: 'red' }}>{total}$</h5> : <h5>{books?.data?.price} $</h5>}
                        </div>
                    </td>
                    <td className="quantity__item">
                        <div className="quantity">
                            <div className="pro-qty-2">
                                <Input type="Number" defaultValue={quantity} onChange={handleTotal} style={{ width: "100px" }} min={1} max="9" onBlur={handleBlur} disabled={checks} />
                            </div>
                        </div>
                    </td>
                    <td className="cart__price">{totalss} $</td>
                    <td className="cart__close"> <CloseCircleOutlined style={{ fontSize: '24px', color: 'red' }} onClick={() => handleRemove(id)} /></td>
                </tr>
            </>}


        </>
    )
}

export default Cart_detail