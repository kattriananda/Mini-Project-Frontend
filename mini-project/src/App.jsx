
import "./App.css";
import Home from "./page/Home";
import Pembayaran from "./page/Pembayaran";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListProduct from "./page/ListProduct";
import Transaksi from "./page/Transaksi";
import TransactionDetail from "./components/TransactionDetail";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import CategoryDetail from "./components/CategoryDetail";
import TableProduct from "./page/TableProduct";
import TableCategory from "./page/TableCategory";
import CategoryForm from "./components/CategoryForm";

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listproduct" element={<ListProduct />} />
                    <Route path="/checkout" element={<Pembayaran />} />
                    <Route path="/transaksi" element={<Transaksi />} />
                    <Route path="transaksi/detail/:transactionId" element={<TransactionDetail />} />
                    <Route path="/category" element={<TableCategory />} />
                    <Route path="/category/add" element={<CategoryForm />} />
                    <Route path="/category/edit/:id" element={<CategoryForm />} />
                    <Route path="/product/add" element={<ProductForm />} />
                    <Route path="/product/edit/:id" element={<ProductForm />} />
                    <Route path="/product/detail/:id" element={<ProductDetail />} />
                    <Route path="/category/detail/:id" element={<CategoryDetail />} />
                    <Route path="/product" element={<TableProduct />} />

                </Routes>
            </Router>
        </>
    );
}

export default App;
