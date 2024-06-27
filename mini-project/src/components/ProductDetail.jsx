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
            <div className="ml-20 mt-28 mr-6">
                {product.map((product) => (
                    <div className="flex justify-between">
                        <div>
                            <div className="flex ">
                                <div className="flex-col space-y-5 w-80">
                                    <p className="font-bold text-left text-[16px]">
                                        ID Produk
                                    </p>
                                    <p className="font-bold text-left text-[16px] ">
                                        Nama Produk
                                    </p>
                                    <p className="font-bold text-left text-[16px]">
                                        Harga Produk
                                    </p>
                                    <p className="font-bold text-left text-[16px]">
                                        URL Produk
                                    </p>
                                    <p className="font-bold text-left text-[16px]">
                                        ID Kategori
                                    </p>
                                    <p className="font-bold text-left text-[16px]">
                                        Nama Kategori
                                    </p>
                                </div>
                                <div className="flex-col space-y-5">
                                    <p className="text-left text-[16px]">
                                        : {product.id}
                                    </p>
                                    <p className="text-left text-[16px]">
                                        : {product.title}
                                    </p>
                                    <p className="text-left text-[16px]">
                                        : Rp. {product.price.toLocaleString()}
                                    </p>
                                    <p className="text-left text-[16px]">
                                        : {product.image}
                                    </p>
                                    <p className="text-left text-[16px]">
                                        : {product.category.id}
                                    </p>
                                    <p className="text-left text-[16px]">
                                        : {product.category.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-1/2 ">
                            <img src={product.image} alt="" className="" />
                        </div>
                    </div>
                ))}

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
