
import { ShoppingCartOutlined } from '@ant-design/icons'
import './order.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
const Order = ({data}:any) => {
    console.log(data);
    return (
        <>
            <div className="bg-light py-3" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Contact</strong></div>
                    </div>
                </div>
            </div>

            <div className="site-section" style = {{minHeight:'500px', marginTop:'100px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <span className="icon-check_circle display-3 text-success"><ShoppingCartOutlined/> </span>
                            <h2 className="display-3 text-black">Thank you!</h2>
                            <p className="lead mb-5">You order was successfuly completed.</p>
                            <p><Link to={'/book'}><Button className="btn btn-sm btn-primary" style={{ height: '50px', background: '#EEEEEE', border: 'none', color: 'black' }}>Back to shop</Button></Link><span>  </span><Link to={`/order/${data}`}><Button className="btn btn-sm btn-primary" style={{ height: '50px', background: 'Silver', border: 'none', color: 'black' }}>View Order Details</Button></Link></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order