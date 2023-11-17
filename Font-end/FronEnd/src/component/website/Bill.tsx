// import './bill.css'

const Bill = () => {
    return (
        <>
            <div className="container mt-5 mb-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="d-flex flex-row p-2"> <img src="https://themewagon.github.io/malefashion/img/logo.png" width="48" />
                                <div className="d-flex flex-column"> <span className="font-weight-bold">Tax Invoice</span> <small>INV-001</small> </div>
                            </div>
                            <hr />
                            <div className="table-responsive p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td>To</td>
                                            <td>From</td>
                                        </tr>
                                        <tr className="content">
                                            <td className="font-weight-bold">Google <br />Attn: John Smith Pymont <br />Australia</td>
                                            <td className="font-weight-bold">Facebook <br /> Attn: John Right Polymont <br /> USA</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="products p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td>Description</td>
                                            <td>Days</td>
                                            <td>Price</td>
                                            <td className="text-center">Total</td>
                                        </tr>
                                        <tr className="content">
                                            <td>Website Redesign</td>
                                            <td>15</td>
                                            <td>$1,500</td>
                                            <td className="text-center">$22,500</td>
                                        </tr>
                                        <tr className="content">
                                            <td>Logo & Identity</td>
                                            <td>10</td>
                                            <td>$1,500</td>
                                            <td className="text-center">$15,000</td>
                                        </tr>
                                        <tr className="content">
                                            <td>Marketing Collateral</td>
                                            <td>3</td>
                                            <td>$1,500</td>
                                            <td className="text-center">$4,500</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="products p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td></td>
                                            <td>Subtotal</td>
                                            <td>GST(10%)</td>
                                            <td className="text-center">Total</td>
                                        </tr>
                                        <tr className="content">
                                            <td></td>
                                            <td>$40,000</td>
                                            <td>2,500</td>
                                            <td className="text-center">$42,500</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="address p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td>Bank Details</td>
                                        </tr>
                                        <tr className="content">
                                            <td> Bank Name : ADS BANK <br /> Swift Code : ADS1234Q <br /> Account Holder : Jelly Pepper <br /> Account Number : 5454542WQR <br /> </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bill