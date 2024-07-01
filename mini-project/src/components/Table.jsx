import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";

const Table = ({ columns, apiEndpoint, itemPath, deleteItem, actions }) => {
    // const {  } = props;
    const fetcher = async () => {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        return data;
    };
    const { data, isLoading, isError, mutate } = useSWR(apiEndpoint, fetcher);
    const navigate = useNavigate;

    const handleDelete = async (id) => {
        try {
            const response = await deleteItem(id);
            if (response.canDelete) {
                mutate();
            } else {
                alert("Product tidak bisa di hapus");
            }
        } catch (error) {
            console.error("error delete: ", error);
        }
    };
    const handleEdit = (id) => {
        navigate(`${itemPath}/edit/${id}`);
    };
   
    if (isLoading) return <div>Loding...</div>;
    if (isError) return <div>Error loading data</div>;
    return (
        <>
            <table className="ml-14 mt-14 w-[90vw]">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="py-2 px-4 border">
                                {col.label}
                            </th>
                        ))}
                        {actions && (
                            <th className="py-2 px-4 border">Action</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((col) => (
                                <td key={col.key} className="py-2 px-4 border">
                                    {col.render
                                        ? col.render(item[col.key])
                                        : item[col.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="py-2 px-4 border">
                                    {actions.includes("detail") && (
                                        <Link
                                            to={`${itemPath}/detail/${item.id}`}
                                        >
                                            <button
                                                className="px-2 py-1 bg-green-900 text-white mr-2"
                                            >
                                                Detail
                                            </button>
                                        </Link>
                                    )}

                                    {actions.includes("edit") && (
                                        <Link
                                        to={`${itemPath}/edit/${item.id}`}
                                    >
                                        <button
                                            onClick={() => handleEdit(item.id)}
                                            className="px-2 py-1 bg-green-900 text-white mr-2"
                                        >
                                            Edit
                                        </button>
                                        </Link>
                                    )}
                                    {actions.includes("delete") && (
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="px-2 py-1 bg-green-900 text-white mr-2"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`${itemPath}/add`}>
                <button
                    className={`mx-10 text-base my-5 rounded-xl bg-green-900 px-4 py-1 text-white`}
                >
                    + Add Item
                </button>
            </Link>
        </>
    );
};
export default Table;
