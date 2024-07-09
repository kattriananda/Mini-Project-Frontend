import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import { getCategories, getProduct } from "../components/Crud";
import useSWR from "swr";
import Cart from "../components/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Box, CircularProgress } from "@mui/material";

const ListProduct = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    const product = async () => {
        const res = await getProduct(search, selectedCategory, sortOrder, sortBy);
        return res;
    };
    const category = async () => {
        const res = await getCategories();
        return res;
    };

    const { data: products, error: productError, mutate: mutateProducts } = useSWR(
        search || selectedCategory
            ? ["/listproduct", search, selectedCategory, sortOrder, sortBy]
            : "/listproduct",
        product
    );
    
    const { data: categories, error: categoryError } = useSWR(
        "/getAll",
        category
    );

     useEffect(()=>{
        mutateProducts()
    },[search, selectedCategory, sortBy, sortOrder])

    if (!product||!categories)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );    

    //  console.log(products);
    //  console.log(categories);

    const handleCategory = (categoryId) => {
        setSelectedCategory((prevCategory) =>
            prevCategory === categoryId ? "" : categoryId
        );
        // console.log(selectedCategory);
    };

    const handleSort = (order, by)=>{
        setSortBy(by)
        setSortOrder(order);
        setShowFilter(false);
    }

    return (
        <div>
            <Sidebar />
            <header className="fixed w-[50rem] top-0 overflow-hidden ml-14 pt-4 bg-white z-30">
                <div className="flex justify-between">
                    <div className="">
                        <h1 className="text-left font-bold text-[32px]">
                            Welcome!!
                        </h1>
                        <p className="text-slate-600">
                            Discover whatever you need easily
                        </p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="">
                            <input
                                type="text"
                                placeholder="Search"
                                className="border p-2 w-64 rounded-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="filter text-lg">
                            <button onClick={()=>setShowFilter(!showFilter)}>
                                <FontAwesomeIcon icon={faFilter} className={`${showFilter ? "-translate-x-20 relative top-4" : ""}`} />
                            </button>
                             {showFilter && (
                                <div className="relative  z-50 right-0 w-46 bg-white border rounded-lg shadow-lg text-left px-4 text-[12px]">
                                    <button onClick={()=> handleSort("asc","price")} className={`block w-full text-left ${sortBy === "price" && sortOrder === "asc" ? "font-bold" : ""}  py-1`}>Harga Terendah</button>
                                    <button onClick={()=> handleSort("desc", "price")} className={`block w-full text-left ${sortBy === "price" && sortOrder === "desc" ? "font-bold" : ""}  py-1`}>Harga Tertinggi</button>
                                    <button onClick={()=> handleSort("asc","title")} className={`block w-full text-left ${sortBy === "title" && sortOrder === "asc" ? "font-bold" : ""}  py-1`}>Berdasarkan nama</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className=" fixed left-24 h-auto content-center top-[88px] py-2 bg-white z-20">
                <div className="grid grid-cols-4 gap-y-2  w-[50rem] ">
                    {categories &&
                        categories.map((category) => (
                            <button
                                key={category.id}
                                className={` w-[160px] border rounded-full px-4 py-1 ${
                                    selectedCategory === category.id
                                        ? "bg-gray-200"
                                        : ""
                                }`}
                                onClick={() => handleCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                </div>
            </div>
    

            <div
                className={`ml-14 mt-32 grid grid-cols-4 w-[50rem] gap-2 overflow-hidden`}
            >
                {products ? (
                    products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Product not found</p>
                    )
                ) : (
                    <p>
                        <CircularProgress /> 
                    </p>
                )}
            </div>
            <Cart />
        </div>
    );
};
export default ListProduct;
