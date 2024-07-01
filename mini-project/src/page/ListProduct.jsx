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

    const { data: products, error: productError } = useSWR(
        search || selectedCategory
            ? ["/listproduct", search, selectedCategory, sortOrder, sortBy]
            : "/listproduct",
        product
    );
    const { data: categories, error: categoryError } = useSWR(
        "/getAll",
        category
    );

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

    const handleSortOrder = (order, by)=>{
        setSortBy(by)
        setSortOrder(order);
        setShowFilter(false);
    }
    const handleSortBy = (order,by)=>{
        setSortBy(by);
        setSortOrder(order)
        setShowFilter(false);
    }
    

    return (
        <div>
            <Sidebar />
            {/* <Header
                title="Welcome!!"
                desc=
                search={search}
                onSearchChange={setSearch}
            /> */}
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
                                <FontAwesomeIcon icon={faFilter} />
                            </button>
                            {showFilter && (
                                <div className="relative top-18 right-0 w-48 bg-white border rounded-lg shadow-lg">
                                    <button onClick={()=> handleSortOrder("asc","price")}>Harga Terendah</button>
                                    <button onClick={()=> handleSortOrder("desc", "price")}>Harga Tertinggi</button>
                                    <button onClick={()=> handleSortBy("asc","title")}>Berdasarkan nama</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className=" fixed left-24 h-14 content-center top-[86px] bg-white z-20">
                <div className="flex space-x-4 w-[50rem] ">
                    {categories &&
                        categories.map((category) => (
                            <button
                                key={category.id}
                                className={` w-[100px] border rounded-full px-4 py-1 ${
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
            {/* </div> */}

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
                    <p>Loading ... </p>
                )}
            </div>
            <Cart />
        </div>
    );
};
export default ListProduct;
