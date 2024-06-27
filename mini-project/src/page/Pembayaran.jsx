import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Pembayaran = () => {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [payment, setPayment] = useState(0);
    const [showPopup, setPopup] = useState(false);

    const handlePayment = (e) => {
        setPayment(Number(e.target.value));
    };

    const handleTransaction = async () => {
        const transactionDetails = items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
        }));
        const totalAmount = transactionDetails.reduce(
            (total, item) => total + item.subtotal,
            0
        );

        const data = {
            totalAmount,
            totalPay: payment,
            transactionDetails,
        };
        try {
            await axios.post("http://localhost:8080/pos/api/addtransaction", data);

            setPopup(true);
            dispatch(clearCart());
            setTimeout(() => {
                setPopup(false);
                navigate("/listproduct");
            }, 3000);
        } catch (error) {
            console.error("Gagal mengirim data ke api", error);
        }
    };

    const total = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const change = payment - total;

    return (
        <>
            <Sidebar />
            <Header title="Rincian Pembayaran" desc="" />
            <div className="mt-16 ml-14 p-4 flex ">
                <div className="pesanan w-[46rem] h-[32rem]  pt-4 overflow-x-auto">
                    <div className="flex-col space-4 space-y-5">
                        {items.map((item) => (
                            <div className="flex border-b-2 pb-2 items-center mr-4 space-x-2">
                                <div className="img h-20 w-20 rounded-xl bg-slate-300">
                                    <img src={item.image} alt="" className="" />
                                </div>
                                <div className="desc w-[43rem] grid grid-cols-3 ">
                                    <div className="text-left space-y-2 ">
                                        <p>{item.title}</p>
                                        <p className="font-semibold">
                                            {item.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>X {item.quantity}</div>
                                    <div className="font-semibold text-right">
                                        Rp. {(item.quantity * item.price).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pembayaran fixed w-[26rem] right-0 text-left space-y-20 mr-10 border-s-4 pl-4">
                    <div className=" font-medium text-2xl ">Pembayaran</div>
                    <div className="flex justify-between font-medium text-[20px]">
                        <p>Total</p>
                        <p>Rp.{total.toLocaleString()}</p>
                    </div>
                    <div className="font-medium text-[20px] space-y-2">
                        <p>Dibayar</p>
                        <input
                            type="number"
                            className="border w-full"
                            value={payment}
                            onChange={handlePayment}
                        />
                    </div>
                    <div className="font-medium flex justify-between text-[20px]">
                        <p>Kembalian</p>
                        <p>Rp.{(change > 0 ? change : 0).toLocaleString()}</p>
                    </div>
                    <div className="">
                        <button
                            className={`w-full rounded-lg border py-2  text-white ${
                                payment >= total
                                    ? "bg-green-950"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={payment < total}
                            onClick={handleTransaction}
                        >
                            Selesai
                        </button>
                    </div>
                    {/* </div> */}
                </div>
                 {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="text-xl font-semibold mb-4">Pembayaran Sukses!</p>
                        <p className="mb-4">Anda akan diarahkan kembali ke halaman daftar produk.</p>
                        <button 
                            className="w-full rounded-lg border py-2 bg-green-950 text-white"
                            onClick={() => {
                                setPopup(false);
                                navigate('/listproduct'); // Sesuaikan path sesuai dengan rute daftar produk Anda
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            </div>
        </>
    );
};

export default Pembayaran;
