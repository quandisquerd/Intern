import { useEffect, useState } from "react";
import { usePostOneBookMutation } from "../../api/book";
import { useGetAllDiscountQuery } from "../../api/discount";


const CheckOutDetail = ({ data, index, quantity, onBook }: any) => {
    const [postbook, { isLoading }] = usePostOneBookMutation()
    const [books, setbooks] = useState<any>({})
    useEffect(() => {
        postbook({ book_id: data })
            .unwrap()
            .then((data) => {
                setbooks(data)
            })
        postbook({ book_id: data })
        onBook(data)
    }, [])
    const { data: discounts } = useGetAllDiscountQuery('')
    const discountName = discounts?.data?.find((datas: any) => datas.id == books?.data?.promorions_id)?.discount;
    const priceDiscount = Number((books?.data?.price) * (discountName / 100))
    const total = Number(books?.data?.price - priceDiscount)
    const [totalss, settotals] = useState<any>(0)
    useEffect(() => {
        if (quantity && books?.data?.price) {
            if (total) {
                settotals(total * quantity);
            } else {
                const newData = Number(quantity * books.data.price);
                settotals(newData);
            }
        }
    },);
    return (
        <>
            <li>{index + 1}. {books?.data?.name} <span>{totalss} $</span></li>
        </>
    )
}

export default CheckOutDetail