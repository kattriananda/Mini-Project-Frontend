import {} from "@fortawesome/free-regular-svg-icons";
import {
    faCartPlus,
    faCartShopping,
    faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Cart from "../components/Cart";

const Header = (props) => {
    const {title, desc} = props;
    const [showCart, setShowCart] = useState(false);
    const toggleCart = () => {
        setShowCart(!showCart);
    };
    return (
        <header className="fixed w-[74rem] top-0 overflow-hidden ml-14 pt-4 bg-white">
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
                    <div className={`${showCart ? "-translate-x-80" : ""}`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="border p-2 w-64 rounded-full"
                        />
                    </div>
                    <div
                        className={`filter text-lg ${
                            showCart ? "-translate-x-[335px]" : ""
                        }`}
                    >
                        <button>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                    <div className="filter text-lg">
                        <button
                            onClick={toggleCart}
                            className={`${
                                showCart ? (
                                    <FontAwesomeIcon icon={faCartShopping} className="z-50" />
                                )  : (
                                    ""
                                )
                            }`}
                        >
                            <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                    </div>
                </div>
                <Cart
                    className={`${showCart ? " right-0 z-[999]" : "right-[-100%]"} `}
                />
            </div>
        </header>
    );
};
export default Header;
