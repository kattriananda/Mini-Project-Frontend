import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Cart = () => {
    return (
        <div className="fixed right-0 top-0 h-full w-96 shadow p-6">
            <div className="h-16 flex justify-between items-start">
                <h2 className="font-semibold text-[22px]">Current Order</h2>
                <button className="">
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className="text-xl"
                    />
                </button>
            </div>
            <div className="Product h-[310px]">
                <div className="flex space-x-4">
                    <div className="img h-20 w-20 bg-slate-300 rounded-xl ">
                        {/* <img
                            src="https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg"
                            alt="Logo"
                        /> */}
                    </div>
                    <div className="desc flex-col w-52 space-y-4 ">
                        <div className="name text-[18px] font-medium">
                            <h4>Nama Product</h4>
                        </div>
                        <div className="flex justify-between w-full ">
                            <h4>Price</h4>
                            <div>
                                <button className="bg-orange-400 w-5">-</button>
                                <input
                                    type="text"
                                    value={1}
                                    className="appearance-none w-10 text-center"
                                />
                                <button className="bg-orange-400 w-5">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="total h-64 py-2">
                <div className="p-5 bg-slate-100 rounded-2xl ">
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>1234</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Discount</p>
                        <p>1234</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Tax</p>
                        <p>1234</p>
                    </div>
                </div>
                <div className="flex justify-between bg-slate-100 rounded-2xl p-5 font-medium text-[18px]">
                    <p className="">Total</p>
                    <p>1234</p>
                </div>
               <button className="w-full h-12 rounded-lg my-5  bg-orange-300 font-semibold">Payment</button>
            </div>
        </div>
    );
};

export default Cart;
