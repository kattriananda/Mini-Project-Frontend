import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
const quantity = 1;

const handleAddtoCart = () => {
    dispatch(
        addItem({
            ...product,
            quantity,
        })
    );
    // console.log("sukses");
};
    return (
        <div className="max-w-sm relative w-48 p-2.5 mb-10 rounded overflow-hidden transition-all cursor-pointer" onClick={handleAddtoCart}>
            <div className="bg-slate-100 h-40 object-contain rounded-xl overflow-hidden">
                <img src={product.image} alt="" className="" /> 
            </div>
            <div className="px-2 pt-2">
                <p className="text-left font-bold text-[16px]">{product.title}</p>
                <p className="text-left">{product.description}</p>
                <p className="text-left font-bold text-[16px]">Rp.{product.price.toLocaleString()}</p>
            </div>
        </div>
    )
}
export default ProductCard