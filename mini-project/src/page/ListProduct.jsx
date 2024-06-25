import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import { getCategories, getProduct } from "../components/Crud";
import useSWR from "swr";
import Cart from "../components/Cart";

const ListProduct = () => {
    const[search, setSearch] = useState(''); 
    const[selectedCategory, setSelectedCategory] = useState('');
    
    const product = async () => {
        const res = await getProduct(search, selectedCategory);
        return res;
    };
    const category = async () => {
        const res = await getCategories();
        return res;
    };
    
    const { data: products, error: productError } = useSWR(  search || selectedCategory ?
        ['/listproduct', search, selectedCategory] : '/listproduct',
        product
    );
    const { data: categories, error: categoryError } = useSWR(
        "/getAll",
        category
    );

    //  console.log(products);
    //  console.log(categories);

    // const handleCategory = (category) => {
    //     setSelectedCategory(category.name);
    //     console.log(selectedCategory);
    // }

   

    return (
        <div>
            <Sidebar />
            <Header
                title="Welcome!!"
                desc=" Discover whatever you need easily"
                search={search}
                onSearchChange={setSearch}
            />
            <div className=" fixed left-24 h-14 content-center top-[86px] z-40 bg-white">
                <div className="flex space-x-4 w-[50rem] ">
                    {categories && categories.map((category) => (
                        <button
                            key={category.id}
                            className={`border rounded-full px-4 py-1 ${selectedCategory === category.name ? 'bg-gray-200':''}`}
                            onClick = {()=> setSelectedCategory(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* </div> */}

            <div
                className={`ml-14 mt-32 grid grid-cols-4 w-[50rem] gap-2 overflow-hidden`}
            >
                    {products ? (products.length > 0 ? (
                        (products.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        )))
                    ) : (
                        <p>Product not found</p>
                    )) :(
                        <p>Loading ... </p>
                    )}
                
            </div>
            <Cart />
        </div>
    );
};
export default ListProduct;
