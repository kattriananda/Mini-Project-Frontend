import React from "react";
import Table from "../components/Table";
import { deleteProduct } from "../components/Crud";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const productColumns = [
    {key:"id", label:"ID"},
    {key:"title", label:"Name"},
    {key:"price", label:"Price"},
    {key:"image", label:"Image", render: (image)=> <img src={image} alt ="" className="w-14"/>},
]

const ProductCrud = () => {
    return (
        <>
        <Sidebar/>
        <Header  title="Daftar Product"
                    desc=" "
                />
        <Table 
        columns = {productColumns} 
        apiEndpoint = "http://localhost:8080/pos/api/listproduct"
        itemPath ="/product"
        deleteItem= {deleteProduct}
        actions={["detail", "edit", "delete"]}/>
        </>
    )
}
export default ProductCrud
   
