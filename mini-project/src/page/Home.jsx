import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";
import { getCategories, getProduct } from "../components/Crud";
import useSWR from "swr";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faHome } from "@fortawesome/free-solid-svg-icons";

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
            <div className="absolute left-24 ">
                <div className="flex justify-between w-[72rem] h-[40rem] items-center">
                    <Link to="/listproduct">
                        <Box className="w-52 h-52 border-2 rounded-lg text-lg font-semibold cursor-pointer hover:scale-110 transition-all">
                            <p> Order </p>
                            {/* <FontAwesomeIcon
                                icon={faClipboardList}
                                className="text-[50px]"
                            /> */}
                        </Box>
                    </Link>
                    <Link to="/transaksi">
                        <Box className="w-52 h-52 border-2 rounded-lg text-lg font-semibold text-center cursor-pointer hover:scale-110 transition-all">
                            Riwayat Transaksi
                        </Box>
                    </Link>
                    <Link to="/product">
                        <Box className="w-52 h-52 border-2 rounded-lg text-lg font-semibold text-center cursor-pointer hover:scale-110 transition-all">
                            Daftar Produk
                        </Box>
                    </Link>
                    <Link to="/category">
                        <Box className="w-52 h-52 border-2 rounded-lg text-lg font-semibold text-center cursor-pointer hover:scale-110 transition-all">
                            Daftar Kategori
                        </Box>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Home;
