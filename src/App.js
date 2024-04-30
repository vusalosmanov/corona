import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../src/pages/home/Home";
import Contact from "./pages/contact/Contact";
import Header from "../src/components/header/Header"
import Footer from "../src/components/footer/Footer"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import OrderHistory from "./pages/orderHistory/OrderHistory";
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
