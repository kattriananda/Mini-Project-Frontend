import { Link, useParams } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import useSWR from "swr";
import { toFormData } from "axios";

const CategoryDetail = () => {
    const { id } = useParams();
    const fetcher = (url) => fetch (url).then((res) => res.json());
    const { data: category, error } = useSWR(
        `http://localhost:8080/pos/api/categories/${id}`,
        fetcher
    );
    console.log(category)

    if (error) return <div>Failed to load data</div>;
     if (!category) return <div>Loading ...</div>;
    return (
        <>
            <Sidebar />
            <Header title="Detail Kategory" />
            <div className="ml-20 mt-28">
                {category.map((category) => (
                    <div key={category.id} className="flex space-x-20">
                        <div className="font-bold text-left text-[16px] flex-col space-y-8">
                            <p>ID Kategori</p>
                            <p>Nama Kategori</p>
                            <p>Jumlah Produk</p>
                        </div>
                        <div className="flex-col text-left space-y-8">
                            <p>: {category.id}</p>
                            <p>: {category.name}</p>
                            <p>: {category.productCount}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/category">
                <button className="absolute top-24 right-16 px-5 py-1 border rounded bg-green-950 text-white">
                    {" "}
                    Kembali
                </button>
            </Link>
        </>
    );
};
export default CategoryDetail;
