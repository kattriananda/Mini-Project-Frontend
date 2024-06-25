import React from "react";
import Table from "../components/Table";
import { deleteProduct } from "../components/Crud";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const transaksiColumns = [
    {key:"id", label:"ID"},
    {key:"totalAmount", label:"Total Harga"},
    {key:"totalPay", label:"Total Bayar"},
    {key:"transactionDate", label:"Tanggal Transaksi"},
]

const Transaksi = () => {
    return (
        <>
        <Sidebar/>
        <Header  title="Riwayat Transaksi"
                    desc=" "
                />
        <Table 
        columns = {transaksiColumns} 
        apiEndpoint = "http://localhost:8080/pos/api/listtransaction"
        itemPath ="/transaksi"
        deleteItem= {deleteProduct}
        actions={["detail"]}/>
        </>
        
    )
}
export default Transaksi
   
