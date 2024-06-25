import {} from "@fortawesome/free-regular-svg-icons";
import {
    faCartPlus,
    faCartShopping,
    faFilter,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Cart from "../components/Cart";
import axios from "axios";
import useSWR from "swr";

const Header = (props) => {
    const {title, desc, search, onSearchChange} = props;
    // const[search, setSearch] = useState(''); 
    // const fetcher = (url) => axios.get(url).then(res => res.data) 
    // const{products, error} = useSWR(search ? `http://localhost:8080/pos/api/listproduct?title=${search}`: '', fetcher)

    // if (error) return <div>Error loading products</div>
    return (
        <header className="fixed w-[50rem]  top-0 overflow-hidden ml-14 pt-4 bg-white z-50">
            <div className="flex justify-between">
                <div className="">
                    <h1 className="text-left font-bold text-[32px]">
                       {title}
                    </h1>
                    <p className="text-slate-600">
                        {desc}
                    </p>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border p-2 w-64 rounded-full"
                            value={search}
                            onChange={e => onSearchChange(e.target.value)}
                        />
                    </div>
                    <div
                        className={`filter text-lg  `}
                    >
                        <button>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                    {/* <div className="filter text-lg">
                        <button
                            // onClick={toggleCart}
                        >
                             <FontAwesomeIcon icon={faCartShopping} />
                            
                        </button>
                    </div> */}
                </div>
                
            </div>
        </header>
    );
};
export default Header;
