import { useState } from "react";
import "./App.css";
import Home from "./page/Home";
import Pembayaran from "./page/Pembayaran";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListProduct from "./page/ListProduct";
import ProductCrud from "./page/ProductCrud";
import Transaksi from "./page/Transaksi";
import CategoryCrud from "./page/CategoryCrud";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listproduct" element={<ListProduct />} />
                    <Route path="/checkout" element={<Pembayaran />} />
                    <Route path="/product" element={<ProductCrud />} />
                    <Route path="/transaksi" element={<Transaksi />} />
                    <Route path="/category" element={<CategoryCrud />} />
                </Routes>
            </Router>
            {/* <Home/> */}
            {/* <Pembayaran/> */}
        </>
    );
}

export default App;
