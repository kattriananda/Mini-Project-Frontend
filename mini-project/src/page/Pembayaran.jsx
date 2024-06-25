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
            <div className="container h-screen mt-16 ml-10 p-4 flex gap-2 overflow-hidden">
                <div className="pesanan w-[50rem] border-e-4 space-y-4 ">
                    {/* <div>
                        <p className="text-left font-medium text-2xl">
                            Rincian Pembayaran
                        </p>
                    </div> */}
                    <div className="flex-col  space-4 space-y-5">
                        {items.map((item) => (
                            <div className="flex border-b-2 pb-2 items-center mr-4 space-x-2">
                                <div className="img h-20 w-20 rounded-xl bg-slate-300"></div>
                                <div className="desc w-[43rem] flex justify-between ">
                                    <div className="text-left space-y-2">
                                        <p>{item.title}</p>
                                        <p className="font-semibold">
                                            {item.price}
                                        </p>
                                    </div>
                                    <div>X {item.quantity}</div>
                                    <div className="font-semibold text-right">
                                        Rp. {item.quantity * item.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pembayaran w-[24rem] h-screen text-left flex-col justify-between space-y-20 ">
                    <div className=" font-medium text-2xl ">Pembayaran</div>
                    <div className="flex justify-between font-medium text-[20px]">
                        <p>Total</p>
                        <p>Rp.{total}</p>
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
                        <p>Rp.{change > 0 ? change : 0}</p>
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
