import React, { useEffect } from "react";
import * as Yup from "yup";
import { getCategories } from "./Crud";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ValidationShema = Yup.object().shape({
    title: Yup.string().required("Name is Required"),
    price: Yup.number()
        .required("Price is Required")
        .positive("Price must be positive"),
    image: Yup.string().required("Image is required"),
    categoryId: Yup.array().of(
        Yup.object().shape({
            categoryId:Yup.string().required("Category is required")
        })
    ),
});

const ProductForm = ({ onSubmit, productId }) => {
    const category = async () => {
        const res = await getCategories();
        return res;
    };
    const { data: categories, error: categoryError } = useSWR(
        "/getAll",
        category
    );
    // const {data: product, error: productError} = useSWR(productId ? `/products/${productId}` )
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset
    } = useForm({ resolver: yupResolver(ValidationShema) });

    // useEffect(()=>{
    //     if (product) {
    //         reset({
    //             title:product.title,
    //             price:product.price,
    //             categoryId:product.categoryId
    //         })
    //     }
    // },[product, reset])
    // const {field, append, remove}= useFieldArray({
    //     control,
    //     name: "color",
    // })

    if (categoryError) return <div>Failed to load category</div>;
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
                <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Selected Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
                {errors.categoryId && (
                    <p className="text-red-500 text-sm">
                        {errors.categoryId.message}
                    </p>
                )}
            </div>
            <button>{productId ? "update product" : "add Product"}</button>
        </form>
    );
};
