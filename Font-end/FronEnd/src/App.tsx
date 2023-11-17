
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import AdminLayout from './layout/admin/AdminLayout';
import Dashbord from "./component/admin/Dashbord";
import ListBook from "./component/admin/ListBook";
import AddBook from "./component/admin/AddBook";
import RecycleBin from "./component/admin/RecycleBin";
import EditBook from "./component/admin/EditBook";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import FogotPassword from "./component/auth/FogotPassword";
import WebsiteLayout from "./layout/website/WebsiteLayout";
import HomePage from "./component/website/HomePage";
import { useEffect, useState } from "react";
import SearchBook from "./component/website/Search";
import Shop from "./component/website/Shop";
import ShopDetail from "./component/website/ShopDetail";
import Cart from "./component/website/Cart";
import CheckOut from "./component/website/CheckOut";
import Order from "./component/website/Order";
import Bill from "./component/website/Bill";
import OrderDetail from "./component/website/OrderDetail";
import ListOrder from "./component/admin/Order";
function App() {
  const [user, setuser]: any = useState({})
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('user')!))
  }, [])
  const chekAdmin = () => {
    if (user || user?.user?.role == 0) {
      return <AdminLayout />
    } else {
      return <Navigate to="/" />
    }
  }
  const [total, settotal] = useState<any>()
  const [cart, setcart] = useState<any>()
  const [idorder, setidorder] = useState<any>()
  const [searchs, setsearchs] = useState<any>()
  const totals = (total: any, { data }: any) => {
    console.log(total, data);
    setcart(data)
    settotal(total);
  }
  const getIdOrder = (id: any) => {
    setidorder(id);
  }
  const search = (data: any) => {
    setsearchs(data)
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={chekAdmin()}>
            <Route path="dashbord" element={<Dashbord />} />
            <Route index element={<Dashbord />} />
            <Route path="book">
              <Route index element={<ListBook />} />
              <Route path="add" element={<AddBook />} />
              <Route path=":id/edit" element={<EditBook />} />
              <Route path="recyclebin" element={<RecycleBin />} />
            </Route>
            <Route path="order">
              <Route index element={<ListOrder />} />
              {/* <Route path="add" element={<AddBook />} />
              <Route path=":id/edit" element={<EditBook />} />
              <Route path="recyclebin" element={<RecycleBin />} /> */}
            </Route>
          </Route>
          <Route path="/" element={<WebsiteLayout onSearchs={search} />}>
            <Route index element={<HomePage />} />
            <Route path="book">
              <Route index element={<Shop />} />
              <Route path=":id" element={<ShopDetail />} />
            </Route>
            <Route path="/cart" element={<Cart onTotal={totals} />} />
            <Route path="/checkout" element={<CheckOut data={total} cart={cart} onId={getIdOrder} />} />
            <Route path="/order"  >
              <Route index element={<Order data={idorder} />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>
            <Route path="/search" element={<SearchBook data={searchs} />} />
          </Route>
          <Route path="/bill" element={<Bill />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fogot" element={<FogotPassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
