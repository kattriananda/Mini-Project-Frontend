import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import useSWR from "swr";
import { Box, Button, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TableReactMaterial = ({
    title,
    columns,
    apiEndpoint,
    itemPath,
    deleteItem,
    actions,
    showAddButton,
}) => {
    const fetcher = async () => {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        return data;
    };

    const { data, error, mutate } = useSWR(apiEndpoint, fetcher);
    const navigate = useNavigate();

    const handlePopUpError = () => {
        withReactContent(Swal)
            .fire({
                title: "Produk Tidak Dapat di Hapus",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            .then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    navigate("/product");
                }
            });
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteItem(id);
            // console.log(response);
            handlePopUpDelete();
        } catch (error) {
            handlePopUpError();
            // console.error("Error deleting item: ", error);
        }
    };

    const handlePopUpDelete = () => {
        withReactContent(Swal)
            .fire({
                title: "Kamu Yakin?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    withReactContent(Swal)
                        .fire({
                            title: "Produk Berhasil di Hapus",
                            icon: "success",
                        })
                            mutate()
                }
            });
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
        <div className="absolute ml-12 top-0 w-[75rem]">
            <h1 className="absolute top-3 z-50 text-[24px] left-3 text-left font-semibold">
                {title}
            </h1>
            <MaterialReactTable
                muiTablePaperProps={{
                    elevation: 0,
                    sx: {
                        padding: "0",
                    },
                }}
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
                renderBottomToolbarCustomActions={() =>
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
                }
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
            />
        </div>
    );
};
export default TableReactMaterial;
