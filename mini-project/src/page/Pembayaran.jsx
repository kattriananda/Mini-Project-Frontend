import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const Pembayaran = () => {
    return (
        <>
            <Sidebar />
            <Header title="Shopcart" desc=""/>
            <div className="container h-screen mt-16 ml-10 p-4 flex gap-2 overflow-hidden">
                <div className="pesanan w-[50rem] border-e-4 space-y-4 ">
                    <div>
                        <p className="text-left font-medium text-2xl">
                            Rincian Pembayaran
                        </p>
                    </div>
                    <div className="flex items-center border-b-2  pb-2 mr-4 space-x-4">
                        <div className="img h-20 w-20 rounded-xl bg-slate-300"></div>
                        <div className="desc w-[43rem] flex justify-between space-x-4 ">
                            <div className="text-left space-y-2">
                                <p>Nama Product</p>
                                <p className="font-semibold">Harga</p>
                            </div>
                            <div>X quantity</div>
                            <div className="font-semibold text-right">
                                total
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pembayaran w-[24rem] h-screen text-left flex-col justify-between space-y-20 ">
                    <div className=" font-medium text-2xl ">Pembayaran</div>
                    <div className="flex justify-between font-medium text-[20px]">
                        <p>Total</p>
                        <p>12345</p>
                    </div>
                    <div className="font-medium text-[20px] space-y-2">
                        <p>Dibayar</p>
                        <input type="text" className="border w-full" />
                    </div>
                    <div className="font-medium flex justify-between text-[20px]">
                        <p>Kembalian</p>
                        <p>12345</p>
                    </div>
                    <div className="">
                        <button className="w-full rounded-lg border py-2 bg-green-950 text-white">Selesai</button>
                    </div>
                    {/* </div> */}
                    
                </div>
            </div>
        </>
    );
};

export default Pembayaran;
