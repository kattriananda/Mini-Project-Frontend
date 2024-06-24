import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import { getProduct } from "../components/Crud";
import useSWR, {} from "swr"

const ListProduct = () => {
    // const product = async () => {
    //     const res =  await getProduct();
    //     return res;
    // }
    // const {data: products, error: productError} = useSWR("/listproduct", product)
    // console.log(products);
    // const fetcher = (url) => fetcher(url). then((res)=> res.json())
    // const {data, error} = useSWR ('http://localhost:3000/products', fetcher)
    // console.log(data);
    return (
        <div>
            <Sidebar />
            <div className="absolute top-5">
            <Header title="Welcome!!" desc=" Discover whatever you need easily"/>
            </div>
            
            <div className=" bg-slate-500">
                <button className="border absolute left-24 top-28 rounded-full px-4 py-1">
                    Mie Instan
                </button>
            </div>
            <div className="ml-14 mt-32">
                <ProductCard />
            </div>
        </div>
    );
};
export default ListProduct;
