// import React from 'react'
// import Layout from './components/Layout/Layout'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs'
import Contact from './pages/contact/Contact'
import Policy from './pages/Policy/Policy'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Layout/Routes/PrivateRoute'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminRoute from './components/Layout/Routes/AdminRoute'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Users from './pages/Admin/Users'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import Product from './pages/Admin/Product'
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProfilePage from './pages/user/ProfilePage';
import ProductDetails from './pages/user/ProductDetails'

function App() {

  // ---->  /dashboard pe jab koi redirect hoga tab woh phle PrivateRoute ko check karega
  // uske baad andar jayega  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product/:slug" element=<ProductDetails/>></Route>
        {/* Protected routes in REACT */}
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="admin/create-category" element={<CreateCategory/>}></Route>
          <Route path="admin/create-product" element={<CreateProduct/>}></Route>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}></Route>
          <Route path="admin/products" element={<Product/>}></Route>
          <Route path="admin/users" element={<Users/>}></Route>
          {/* <Route path="admin/profile" element={<SellerProfile/>}></Route> */}
        </Route>
        {/* <Route path="/dashboard/admin/profile" element={<SellerProfile/>}></Route> */}
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/policy" element={<Policy/>}></Route>
        <Route path="/logout" element={<Home/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
