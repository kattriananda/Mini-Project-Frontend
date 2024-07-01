import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const ProductDetail = () => {
    const { id } = useParams();

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: product, error } = useSWR(
        `http://localhost:8080/pos/api/detailproduct/${id}`,
        fetcher
    );
    console.log(product);
    if (error) return <div className="text-red-500">Failed to load</div>;
    if (!product) return <div>Loading...</div>;

    return (
        <>
            <Sidebar />
            <Header title="Detail Product" />
            <div className="ml-20 mt-28 mr-6 ">
                {/* {product.map((product) => ( */}
                <div className="flex justify-between">
                    <div className="w-[50rem]">
                        <div className="flex w-1/2">
                            <div className="flex-col space-y-5 w-80 text-[16px] text-left">
                                <div className="flex w-[45rem]">
                                    <p className="font-bold w-[20rem]">ID Produk</p>
                                    <p className="">: {product.id}</p>
                                </div>
                                <div className="flex w-[45rem]">
                                    <p className="font-bold w-[20rem]">Nama Produk</p>
                                    <p className="">: {product.title}</p>
                                </div>
                                <div className="flex w-[45rem]">
                                    <p className="font-bold w-[20rem]">Harga Produk</p>
                                    <p className="">
                                        : {product.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex w-[45rem] ">
                                    <p className="font-bold w-[20rem]  ">URL Produk</p>
                                    <p className="w-[20rem] text-wrap">: {product.image}</p>
                                </div>
                                <div className="flex w-[45rem]">
                                    <p className="font-bold w-[20rem]">ID Kategori</p>
                                    <p className="">: {product.category.id}</p>
                                </div>
                                <div className="flex w-[45rem]">
                                    <p className="font-bold w-[20rem]">ID Kategori</p>
                                    <p className="">: {product.category.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-1/2 ">
                        <img src={product.image} alt="" className="" />
                    </div>
                </div>
                {/* ))} */}

                {/* )} */}
            </div>
            <Link to="/product">
                <button className="absolute top-24 right-16 px-5 py-1 border rounded bg-green-950 text-white">
                    {" "}
                    Kembali
                </button>
            </Link>
        </>
    );
};
export default ProductDetail;
