import { useState } from "react";
import "./App.css";
import Home from "./page/Home";
import Pembayaran from "./page/Pembayaran";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListProduct from "./page/ListProduct";
import ProductCrud from "./page/ProductCrud";
import Transaksi from "./page/Transaksi";
import CategoryCrud from "./page/CategoryCrud";
import TransactionDetail from "./page/TransactionDetail";
import ProductForm from "./components/ProductForm";

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
                    <Route path="transaksi/detail/:transactionId" element={<TransactionDetail />} />
                    <Route path="/category" element={<CategoryCrud />} />
                    <Route path="/form/add" element={<ProductForm />} />
                    <Route path="/form/edit/:id" element={<ProductForm />} />

                </Routes>
            </Router>
            {/* <Home/> */}
            {/* <Pembayaran/> */}
        </>
    );
}

export default App;
