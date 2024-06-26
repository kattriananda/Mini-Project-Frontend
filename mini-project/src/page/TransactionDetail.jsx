import { Link, useParams } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import useSWR from "swr";

const TransactionDetail = () => {
    const { transactionId } = useParams();

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: transaksi, error } = useSWR(
        `http://localhost:8080/pos/api/listtransaksidetail/${transactionId}`,
        fetcher
    );
    if (error) return <div className="text-red-500">Failed to load</div>;
    if (!transaksi) return <div>Loading...</div>;

    if (transaksi.status === "failed") {
        return <div>{transaksi.messages[0]}</div>;
    }
    if (transaksi.length === 0) {
        return <div>No transaction Data</div>;
    }
    console.log(transaksi);
    console.log(transactionId);
    const { totalAmount, totalPay, transactionDate } = transaksi[0];
    return (
        <>
            <Sidebar />
            <Header title="Detail Transaksi" className="w-full" />
            <div className="ml-14 mt-20">
                {transaksi.length === 0 ? (
                    <div>No transaction Data</div>
                ) : (
                    <div>
                        <div className="flex space-x-3">
                            <div className="flex-col">
                                <p className="font-bold text-left text-[16px]">
                                    ID Transaksi
                                </p>
                                <p className="font-bold text-left text-[16px]">
                                    Tanggal Transaksi
                                </p>
                                <p className="font-bold text-left text-[16px]">
                                    Total Harga
                                </p>
                                <p className="font-bold text-left text-[16px]">
                                    Total Bayar
                                </p>
                            </div>
                            <div className="flex-col">
                                <p className=" text-left text-[16px]">
                                    : {transactionId}
                                </p>
                                <p className=" text-left text-[16px]">
                                    :{" "}
                                    {new Date(
                                        transactionDate
                                    ).toLocaleDateString()}
                                </p>
                                <p className=" text-left text-[16px]">
                                    : Rp.{totalAmount.toLocaleString()}
                                </p>
                                <p className="text-left text-[16px]">
                                    : Rp.{totalPay.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <table className="w-full mt-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Id Produk</th>
                                    <th className="p-2">Nama Product</th>
                                    <th className="p-2">Harga Satuan</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaksi.map((item) => (
                                    // <p key={item.productId}>{item.productId}</p>
                                    <tr
                                        key={item.productId}
                                        className="border-t"
                                    >
                                        <td className="p-2">
                                            {item.productId}
                                        </td>
                                        <td className="p-2">
                                            {item.productName}
                                        </td>
                                        <td className="p-2">
                                            {item.productPrice.toLocaleString()}
                                        </td>
                                        <td className="p-2">{item.quantity}</td>
                                        <td className="p-2">
                                            {item.subtotal.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Link to="/transaksi">
                <button className="absolute top-44 right-14 px-5 py-1 border rounded bg-green-950 text-white">
                    {" "}
                    Kembali
                </button>
            </Link>
        </>
    );
};

export default TransactionDetail;
