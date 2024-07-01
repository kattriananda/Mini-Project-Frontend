import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { addProduct, getCategories, getProductById, updateProduct } from "./Crud";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSWR, { mutate } from "swr";
import { useNavigate, useParams } from "react-router-dom";

const ValidationShema = Yup.object().shape({
    title: Yup.string().required("Name is Required"),
    price: Yup.number()
        .required("Price is Required")
        .positive("Price must be positive"),
    image: Yup.string().required("Image is required"),
    categoryId:Yup.number().required("Category is required")
});


const getCategory = () => getCategories();

const ProductForm = () => {
    const {id}= useParams();
    const navigate = useNavigate();

    const { data: categories, error: categoryError } = useSWR(
        "/getAll",
        getCategory
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: yupResolver(ValidationShema) });

    useEffect(()=>{
        if (id) {
            getProductById(id).then((product) => {
                 console.log(product)
                reset({...product,
                    categoryId: product.category.id} 
                )
            })
        }
    },[id])
    
    const onSubmit = async (data) => {
        data.price = Number(data.price);
        data.categoryId = Number(data.categoryId);
        console.log("Data:", data);
        try {
            if (id){
                await updateProduct(id, data);
            } else{
                await addProduct(data)
            }
            mutate();
            navigate('/product')
        }catch (error) {
            console.error("Error submitting form : ", error)
        }
        //  console.log("Form Data:", data); 
    };
    if (categoryError ) return <div>Failed to load data</div>;
    if (!categories) return <div>Loading...</div>;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            
            className="max-w-md mx-auto mt-14 p-5 border rounded shadow"
        >
            <div className="mb-4">
                <label htmlFor="">Name</label>
                <input
                    type="text"
                    {...register("title")}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">
                        {errors.title.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="">Price</label>
                <input
                    type="number"
                    {...register("price")}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.price && (
                    <p className="text-red-500 text-sm">
                        {errors.price.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="">Image</label>
                <input
                    type="text"
                    {...register("image")}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.image && (
                    <p className="text-red-500 text-sm">
                        {errors.image.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="">Category</label>
                        <select
                            {...register('categoryId')}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    
                {errors.categoryId && (
                    <p className="text-red-500 text-sm">
                        {errors.categoryId.message}
                    </p>
                )}
            </div>
            <div className="flex space-x-2 justify-between">
            <button type="submit" className="border px-2 py-1 rounded-lg bg-slate-200 hover:bg-green-950 hover:text-white">{id ? "Update product" : "Add Product"}</button>
            <button onClick={()=> navigate("/product")} className="border px-4 py-1 rounded-lg bg-slate-200 hover:bg-red-600 hover:text-white">Cancel</button>
            </div>
            
        </form>
    );
};

export default ProductForm
