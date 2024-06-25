import React from "react";
import Table from "../components/Table";
import { deleteProduct } from "../components/Crud";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const categoryColumns = [
    {key:"id", label:"ID"},
    {key:"name", label:"Name"},
    {key:"product", label:"Jumlah Product Terkait"},
]

const CategoryCrud = () => {
    return (
        <>
        <Sidebar/>
        <Header  title="Daftar Kategori"
                    desc=" "
                />
        <Table 
        columns = {categoryColumns} 
        apiEndpoint = "http://localhost:8080/pos/api/getAll"
        itemPath ="/category"
        deleteItem= {deleteProduct}
        actions={["detail", "edit", "delete"]}/>
        </>
    )
}
export default CategoryCrud
   
