import React from "react";
import { Route, Router, Routes } from "react-router";
import RootLayout from "./Components/RootLayout";
import HomePage from "./pages/HomePage";
import "./App.css";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoute from "./Components/UserRoute";
import ProductList from "./pages/AdminPage/ProductList";
import AddProduct from "./pages/AdminPage/AddProduct";
import EditProduct from "./pages/AdminPage/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/userPage/Cart";
import Shipping from "./pages/Auth/Shipping";
import OrderPage from "./pages/userPage/OrderPage";
import UserProfile from "./pages/userPage/UserProfile";
import Plants from "./pages/ plantsandaccessories/Plants";
import Accessories from "./pages/ plantsandaccessories/Accessories";
import WishList from "./pages/userPage/WishList";
import OrderDetail from "./pages/userPage/OrderDetail";
import Contact from "./pages/company/Contact";
import About from "./pages/company/About";
import Privacy_Policy from "./pages/company/Privacy_Policy";
import RefundPolicy from "./pages/company/RefundPolicy";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminProduct from "./pages/AdminPage/Products";
import Products from "./pages/AdminPage/Products";
import AdminRoute from "./pages/AdminPage/AdminRoute";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route  path="*" element={<ErrorPage/>}/>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="plants" element={<Plants />} />
          <Route path="accessories" element={<Accessories />} />

          <Route element={<UserRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signUp" element={<SignUp />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/profile" element={<AdminPage />} />
          </Route>

          <Route path="products/all" element={<ProductList />} />
          <Route path="productDetail/:id" element={<ProductDetail />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="product/:id" element={<EditProduct />} />
          <Route path="searchPage/:search" element={<SearchPage/>}/>
          <Route path="user/cart" element={<Cart />} />
          <Route path="user/wishlist" element={<WishList />} />
          <Route path="user/shipping" element={<Shipping />} />
          <Route path="user/checkout" element={<OrderPage />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="adminPage" element={<AdminPage />} />
          <Route path="user/order/:id" element={<OrderDetail />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacyandpolicy" element={<Privacy_Policy />} />
          <Route path="/refundpolicy" element={<RefundPolicy />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1000} position="top-right" />
    </>
  );
}

export default App;
