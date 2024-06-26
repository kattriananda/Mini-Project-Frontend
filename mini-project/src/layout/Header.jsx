import {} from "@fortawesome/free-regular-svg-icons";
import {
    faCartPlus,
    faCartShopping,
    faFilter,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Header = (props) => {
    const {title, desc, search, onSearchChange} = props;
    return (
        <header className="fixed w-full top-0 overflow-hidden ml-12 pt-4 pb-8 bg-white z-50">
            <div className="flex justify-between">
                <div className="">
                    <h1 className="text-left font-bold text-[32px]">
                       {title}
                    </h1>
                    <p className="text-slate-600">
                        {desc}
                    </p>
                </div>
                <div className="flex items-center space-x-6 mr-28">
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
