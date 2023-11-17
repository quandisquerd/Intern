import { Link, Outlet, useNavigate } from "react-router-dom"
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/elegant-icons.css'
import './css/magnific-popup.css'
import './css/nice-select.css'
import './css/owl.carousel.min.css'
import './css/slicknav.min.css'
import './css/style.css'
import { UserOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Form, Skeleton, message } from "antd"
import { pause } from "../../util/pause"
import { Input } from 'antd';
import { useSearchBookMutation } from "../../api/book"
import SearchBook from "../../component/website/Search"
import { useGetAllCartQuery } from "../../api/cart"
const { Search } = Input
const WebsiteLayout = ({ onSearchs }: any) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [user, setuser]: any = useState({})
  const [check, setcheck] = useState('')
  const navigate = useNavigate()
  const [search, { isLoading: searchding }] = useSearchBookMutation()
  const [seachdata, setsearchdata] = useState([])
  const [showSearchResult, setShowSearchResult] = useState(false);
  const users = JSON.parse(localStorage.getItem('user')!)
  const token = users?.accesstoken
  const { data: cart } = useGetAllCartQuery(token)
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('user')!))
    if (user?.user?.role === 0) {
      setcheck('admin')
    } else {
      setcheck('member')
    }
  }, [])
  const logout = async () => {
    localStorage.removeItem('user')
    messageApi.open({
      type: 'success',
      content: 'Bạn đã đăng xuất thành công!'
    })
    await pause(2000)
    navigate('/login')
  }
  const onSearch = (value: any) => {
    setShowSearchResult(true)
    search(value)
      .unwrap()
      .then(async (data: any) => {
        setsearchdata(data);
        onSearchs(data)
        await pause(200)
        navigate('/search')
      })
  }
  const skeletonBlocks = Array.from({ length: 12 }, (_, index) => (
    <div key={index} className="skeleton-block">
      <Skeleton width={300} height={350} />
    </div>
  ));
  return (
    <>
      {contextHolder}
      <body>
        <header className="header" style={{ display: 'flex' }}>

          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <div className="header__logo">
                  <a href="./index.html"><img src="https://themewagon.github.io/malefashion/img/logo.png" alt="" /></a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li ><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/book'}>Shop</Link></li>
                    <li><a href="#">Pages</a>
                      <ul className="dropdown">
                        <li><a href="./about.html">About Us</a></li>
                        <li><a href="./shop-details.html">Shop Details</a></li>
                        <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                        <li><a href="./checkout.html">Check Out</a></li>
                        <li><a href="./blog-details.html">Blog Details</a></li>
                      </ul>
                    </li>
                    <li><a href="./blog.html">Blog</a></li>
                    <li><a href="./contact.html">Contacts</a></li>
                  </ul>
                </nav>
              </div>

              <div className="col-lg-3 col-md-3">
                <div className="header__nav__option">
                  <a href="#"><img src="https://themewagon.github.io/malefashion/img/icon/heart.png" alt="" /></a>
                  <Link to="/cart"><img src="https://themewagon.github.io/malefashion/img/icon/cart.png" alt="" /> <span>{cart?.data?.length}</span></Link>
                  {user ? <>
                    <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" style={{ padding: 0 }}>
                      <div className="avatar " style={{ width: '80%' }}>
                        <img src={user?.user?.image} alt="a" className="w-px-40 h-auto rounded-circle" />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar avatar-online">
                                <img src={user?.user?.image} alt="a" className="w-px-40 h-auto rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1" style={{ display: 'flex', flexDirection: 'column' }}>
                              <small style={{ fontWeight: '600', fontSize: '15px' }}>{user?.user?.ho} {user?.user?.ten}</small>
                              <small style={{ color: '#a1acb8 ' }}>{check}</small>
                            </div>
                          </div>
                        </a>
                      </li>

                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bx bx-user me-2" style={{ fontSize: '12px' }}> My Profile</i>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="bx bx-cog me-2" style={{ fontSize: '12px' }}> Settings</i>
                          {/* <span className="align-middle" style={{ flexGrow: 1, float: 'right'}}>Settings</span> */}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="flex-shrink-0 bx bx-credit-card me-2" style={{ fontSize: '12px' }}> Billing</i>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li onClick={() => logout()}>
                        <a className="dropdown-item">
                          <i className="bx bx-power-off me-2" style={{ fontSize: '12px' }}> Log Out</i>
                        </a>
                      </li>
                    </ul></> : <a > <img /><Link to={'/login'}><UserOutlined style={{ fontSize: '17px', marginTop: '-20px' }} /></Link></a>}

                  {/* <li className="nav-item navbar-dropdown dropdown-user dropdown" style={{listStyle:'none'}}> */}
                  {/* </li> */}
                </div>

              </div>

            </div>

            <div className="canvas__open"><i className="fa fa-bars"></i></div>
          </div>

          <Form style={{ marginTop: '1.38%', marginRight: '100px' }} onFinish={onSearch}>
            <Form.Item name="search">
              <Search placeholder="input search text" style={{ width: 250 }} />
            </Form.Item>

          </Form>
        </header>
        {searchding ? <div className="skeleton-container">
          {skeletonBlocks}
        </div> : <>
          <div className="search-model">
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div className="search-close-switch">+</div>
              <form className="search-model-form">
                <input type="text" id="search-input" placeholder="Search here....." />
              </form>
            </div>
          </div>
          {/* {showSearchResult ? <SearchBook data={seachdata} /> : } */}
          <Outlet />

          
        </>}<footer className="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="footer__about">
                    <div className="footer__logo">
                      <a href="#"><img src="https://themewagon.github.io/malefashion/img/footer-logo.png" alt="" /></a>
                    </div>
                    <p>The customer is at the heart of our unique business model, which includes design.</p>
                    <a href="#"><img src="img/payment.png" alt="" /></a>
                  </div>
                </div>
                <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                  <div className="footer__widget">
                    <h6>Shopping</h6>
                    <ul>
                      <li><a href="#">Clothing Store</a></li>
                      <li><a href="#">Trending Shoes</a></li>
                      <li><a href="#">Accessories</a></li>
                      <li><a href="#">Sale</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6">
                  <div className="footer__widget">
                    <h6>Shopping</h6>
                    <ul>
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Payment Methods</a></li>
                      <li><a href="#">Delivary</a></li>
                      <li><a href="#">Return & Exchanges</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                  <div className="footer__widget">
                    <h6>NewLetter</h6>
                    <div className="footer__newslatter">
                      <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                      <form action="#">
                        <input type="text" placeholder="Your email" />
                        <button type="submit"><span className="icon_mail_alt"></span></button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer></body>

    </>
  )
}

export default WebsiteLayout