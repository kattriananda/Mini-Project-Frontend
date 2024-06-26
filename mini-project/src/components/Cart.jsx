import {
    faCartShopping,
    faTrash,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    decrementQuantity,
    incrementQuantity,
    removeItem,
} from "../store/cartSlice";

const Cart = () => {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handleIncrement = (id) => {
        dispatch(incrementQuantity({ id }));
    };
    const handleDecrement = (id) => {
        dispatch(decrementQuantity({ id }));
    };
    const handleRemove = (id) => {
        dispatch(removeItem({ id }));
    };

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.1;
    const discount = 0;
    const total = subtotal + tax - discount;

    return (
        <div className={`fixed top-0 h-full w-96 shadow p-6 bg-white right-0 `}>
            <div className="h-20 flex justify-between items-start">
                <h2 className="font-semibold text-[22px] mt-4">
                    Current Order
                </h2>
            </div>
            <div className="Product h-[310px] ">
                {items.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Cart is Empty
                    </div>
                ) : (
                    <div className=" h-72 overflow-auto ">
                        {items.map((item) => (
                            <div
                                key={`${item.id}`}
                                className="flex space-x-4 pb-2 items-center border-b-2"
                            >
                                <div className="img h-20 w-20 bg-slate-300 rounded-xl mt-2">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="desc flex-col w-[14.5rem] space-y-4 ">
                                    <div className="name text-[18px] font-medium">
                                        <h4>{item.title}</h4>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h4>
                                            Rp. {item.price.toLocaleString()}
                                        </h4>
                                        <div className="flex items-center space-x-2">
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        handleDecrement(item.id)
                                                    }
                                                    className="bg-green-950 text-white font-semibold w-5 hover:bg-green-900"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    min="1"
                                                    readOnly
                                                    className="appearance-none w-10 text-center"
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleIncrement(item.id)
                                                    }
                                                    className="bg-green-950 text-white font-semibold w-5 hover:bg-green-900"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className=" text-black border hover:bg-red-600 hover:text-white rounded-full px-[9px] pb-1 "
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="text-[10px]"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="total h-64 py-2">
                <div className="p-5 bg-slate-100 rounded-2xl ">
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>Rp. {subtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Discount</p>
                        <p>Rp. {discount}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Tax</p>
                        <p>Rp. {tax.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex justify-between bg-slate-100 rounded-2xl p-5 font-medium text-[18px]">
                    <p className="">Total</p>
                    <p>Rp.{total.toLocaleString()}</p>
                </div>
                <Link to="/checkout">
                    <button className="w-full h-12 rounded-lg my-5  bg-green-950 text-white font-semibold hover:bg-green-900">
                        Payment
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
