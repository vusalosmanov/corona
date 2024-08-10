import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { addAdmin } from "./firebase/adminSetup";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import ProductDetails from "./pages/detailes/ProducDetailes";
import ProductCart from "./pages/cart/ProductCart";
import ShopCart from "./pages/productShop/ShopCart";
import AllProducts from "./pages/admin/AllProducts";
import AddProducts from "./pages/admin/AddProducts";
import ProtectedRoute from "./routers/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Admin from "./pages/admin/Admin";
import Users from "./pages/admin/Users";
import AddAdmin from "./pages/admin/AddAdmin";
import Orders from "./pages/admin/Ordesr";
import Invoice from "./pages/invoice/Invoice";
import Error from "./pages/error/Error";

function App() {
  useEffect(() => {
    const adminEmail = "vusal.osmanov66@gmail.com";
    addAdmin(adminEmail);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#081028]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/dashboard" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="add-products" element={<AddProducts />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
              <Route path="add-admin" element={<AddAdmin />} />
            </Route>
          </Route>
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/productcart" element={<ProductCart />} />
          <Route path="/shopcart" element={<ShopCart />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
