import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import { getCategories, getProduct } from "../components/Crud";
import useSWR, {} from "swr"
import { useDispatch } from 'react-redux'
import { addItem } from "../store/cartSlice";

const ListProduct = () => {
    const product = async () => {
        const res = await getProduct();
        return res;
    };
    const category = async () => {
        const res = await getCategories();
        return res;
    };
    const { data: products, error: productError } = useSWR(
        "/listproduct",
        product
    );
    const { data: categories, error: categoryError } = useSWR(
        "/getAll",
        category
    );
    const dispatch = useDispatch();

    
    //  console.log(products);
    //  console.log(categories);
    
    const handleAddtoCart = () => {
        dispatch(addItem({
            ...product, 
            quantity
        }))
        console.log ("sukses")

    }

    return (
        <div>
            <Sidebar />
            <div className="absolute top-5">
                <Header
                    title="Welcome!!"
                    desc=" Discover whatever you need easily"
                />
            </div>
            {/* <div className=" "> */}
                <div className=" fixed left-24 h-14 content-center top-[86px] z-40 bg-white">
                    <div className="flex space-x-4 w-[80rem]">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="border rounded-full px-4 py-1"
                        >
                            {category.name}
                        </button>
                    ))}
                    </div>
                   
                </div>
            {/* </div> */}

            <div className={`ml-14 mt-32 grid grid-cols-5  overflow-hidden`  } >
                 {products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={handleAddtoCart} />
                ))} 
            </div>
        </div>
    );
};
export default ListProduct;
