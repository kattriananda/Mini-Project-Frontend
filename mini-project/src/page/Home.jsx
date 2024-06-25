import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import { getCategories, getProduct } from "../components/Crud";
import useSWR from "swr";

const Home = () => {
    
    return (
        <div>
            <Sidebar />
            <div className="absolute top-5">
                <Header
                    title="Welcome!!"
                    desc=" Discover whatever you need easily"
                />
            </div>
            <div className="absolute top-28 left-24">
                <div className="flex space-x-6">
                <div>Order</div>
                <div>Transaksi</div>
                <div>Product</div>
                <div>Category</div>
                </div>
                
            </div>
            
        </div>
    );
};
export default Home;
