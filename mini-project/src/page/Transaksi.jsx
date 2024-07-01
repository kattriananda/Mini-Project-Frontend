import React from "react";
import Table from "../components/Table";
import { deleteProduct } from "../components/Crud";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import TableReactMaterial from "../components/TableReacMaterial";

const transaksiColumns = [
    { accessorKey: "id", header: "ID", id: "id" },
    {
        accessorKey: "totalAmount",
        header: "Total Harga",
        id: "totalAmount",
        Cell: ({ cell }) => <p>{cell.getValue()?.toLocaleString()}</p>,
    },
    {
        accessorKey: "totalPay",
        header: "Total Bayar",
        id: "totalPay",
        Cell: ({ cell }) => <p>{cell.getValue()?.toLocaleString()}</p>,
    },
    {
        accessorKey: "transactionDate",
        header: "Tanggal Transaksi",
        id: "transactionDate",
        Cell: ({ cell }) => (
            <p>{new Date(cell.getValue())?.toLocaleString()}</p>
        ),
    },
];

const Transaksi = () => {
    return (
        <>
            <Sidebar />

            <TableReactMaterial
                title="Riwayat Transaksi"
                columns={transaksiColumns}
                apiEndpoint="http://localhost:8080/pos/api/listtransaction"
                itemPath="/transaksi"
                deleteItem={deleteProduct}
                actions={["detail"]}
                showAddButton={false}
            />
        </>
    );
};
export default Transaksi;
