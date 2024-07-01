import { deleteProduct } from "../components/Crud"
import TableReactMaterial from "../components/TableReacMaterial"
import Sidebar from "../layout/Sidebar"

const TableCategory = ()=>{
    const categoryColumns = [
        {accessorKey : "id", header: "ID", id:"id"},
        {accessorKey: "name", header: "Nama Kategori", id:"name"},
        {accessorKey: "productCount", header: "Jumlah Product Terkait"}
    ]

    return (
        <>
            <Sidebar/>
            <TableReactMaterial
            title="Daftar Kategori" 
                columns={categoryColumns}
                apiEndpoint="http://localhost:8080/pos/api/categories"
                itemPath="/category"
                deleteItem={deleteProduct}
                actions={["detail", "edit", "delete"]}
                showAddButton={true}
            />
        </>
    )
}

export default TableCategory