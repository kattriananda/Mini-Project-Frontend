import React from "react";

const ProductCard = ({product}) => {
    return (
        <div className="max-w-sm relative  w-60 p-2.5 mb-10 bg-white rounded overflow-hidden transition-all">
            <div className="bg-slate-100 h-40 object-contain rounded-xl">
                <img src="" alt="" />
            </div>
            <div className="px-2 pt-2">
                <p className="text-left font-bold text-[16px]">product name</p>
                <p className="text-left">desc</p>
                <p className="text-left font-bold text-[16px]">price</p>
            </div>
        </div>
    )
}
export default ProductCard