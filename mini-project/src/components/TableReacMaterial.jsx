import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";

import useSWR from "swr";
import { Box, Button, CircularProgress } from "@mui/material";

const TableReactMaterial = ({
    title,
    columns,
    apiEndpoint,
    itemPath,
    deleteItem,
    actions,
    showAddButton
}) => {
    const fetcher = async () => {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        return data;
    };

    const { data, error, mutate } = useSWR(apiEndpoint, fetcher);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const response = await deleteItem(id);
            console.log(response)
            
                alert("Product Berhasil di hapus");
                mutate();
            
        } catch (error) {
            alert("Product tidak bisa di hapus", error)
            console.error("Error deleting item: ", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`${itemPath}/edit/${id}`);
    };

    if (!data)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    if (error) return <div>Error loading data</div>;

    return (
        <div className="ml-12">
            <h1 className="absolute top-12 z-50 text-[24px] left-24 text-left font-semibold">{title}</h1>
            <MaterialReactTable
                initialState={{
                    showGlobalFilter: true,
                    columnPinning: {
                        right: ["mrt-row-actions"],
                    },
                }}
                displayColumnDefOptions={{
                    "mrt-row-actions": {
                        muiTableHeadCellProps: {
                            align: "center",
                        },
                        size: 120,
                    },
                }}
                // positionToolbarAlertBanner="bottom"
                enableColomnPinning
                enableFacetedValues
                columns={columns}
                data={data}
                enableRowActions
                rowCount={data.length}
                renderBottomToolbarCustomActions={() => (
                    showAddButton && (
                        <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`${itemPath}/add`}
                    >
                        + Add Item
                    </Button>
                    )
                )}
                // renderRowActions={}
                renderRowActions={({ row }) => {
                    // console.log("Row data:", row);
                    return (
                        <Box className="flex justify-center">
                            {actions.includes("detail") && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component={Link}
                                    to={`${itemPath}/detail/${row.original.id}`}
                                    style={{ marginRight: 8 }}
                                >
                                    Detail
                                </Button>
                            )}
                            {actions.includes("edit") && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleEdit(row.original.id)}
                                    style={{ marginRight: 8 }}
                                >
                                    Edit
                                </Button>
                            )}
                            {actions.includes("delete") && (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() =>
                                        handleDelete(row.original.id)
                                    }
                                    style={{ marginRight: 8 }}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    );
                }}
                className="rounded-lg shadow-none"
            />
        </div>
    );
};
export default TableReactMaterial;
