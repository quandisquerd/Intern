import { useGetOneBookQuery } from "../../api/book";


const BookDetail_Order = ({ data, index }: any) => {
    const { data: books } = useGetOneBookQuery(data)
    return (
        <>
            <div className="d-flex justify-content-start align-items-center list py-1" style={{ width: '90%', margin: '0 auto', padding: '10px' }}>
                <div><b>{index + 1}</b></div>
                <div className="mx-3"> <img src={books?.data[0]?.image} alt="apple" className="rounded-circle" width="30" height="30" /> </div>
                <div className="order-item">{books?.data[0]?.name}</div>
            </div>
        </>
    )
}

export default BookDetail_Order