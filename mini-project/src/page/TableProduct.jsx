import React from "react";
import { deleteProduct } from "../components/Crud";
import Sidebar from "../layout/Sidebar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import TableReactMaterial from "../components/TableReacMaterial";



const TableProduct = () => {
    
    const productColumns = [
        { accessorKey: "id", header: "ID", id: "id" },
        { accessorKey: "title", header: "Name", id: "title" },
        { accessorKey: "price", header: "Price", id: "price", Cell:({cell}) =>(
            <p>{cell.getValue()?.toLocaleString()}</p>
        ) },
        {
            accessorKey: "image",
            header: "Image",
            id: "image",
            Cell: ({ cell }) => <img src={cell.getValue()} alt="" className="w-10 h-10" />,
        },
    ]
    return (
        <>
        <Sidebar/>
        <TableReactMaterial
        title="Daftar Produk"
        columns = {productColumns} 
        apiEndpoint = "http://localhost:8080/pos/api/listproduct"
        itemPath ="/product"
        deleteItem= {deleteProduct}
        actions={["detail", "edit","delete"]}
        showAddButton={true}
        />
        </>
    )
}
export default TableProduct;
   
