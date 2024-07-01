
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import * as Yup from "yup";
import { addCatogory, getCategoryById } from "./Crud";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const ValidationShema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
});

const CategoryForm = () => {
    const {id}= useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ resolver: yupResolver(ValidationShema) });

    useEffect(()=>{
        if (id) {
            getCategoryById(id).then((category) => {
                reset(...category)
            })
        }
    },[id])
    
    const onSubmit = async (data) => {
        console.log("Data:", data);
        try {
            if (id){
                await updateProduct(id, data);
            } else{
                await addCatogory(data)
            }
            navigate('/category')
        }catch (error) {
            console.error("Error submitting form : ", error)
        }
        //  console.log("Form Data:", data); 
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-14 p-5 border rounded shadow"
        >
            <div className="mb-4">
                <label htmlFor="">Name</label>
                <input
                    type="text"
                    {...register("name")}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div className="flex space-x-2 justify-between">
            <button type="submit" className="border px-2 py-1 rounded-lg bg-slate-200 hover:bg-green-950 hover:text-white">{id ? "Update Category" : "Add Category"}</button>
            <button onClick={()=> navigate("/category")} className="border px-4 py-1 rounded-lg bg-slate-200 hover:bg-red-600 hover:text-white">Cancel</button>
            </div>
            
        </form>
    );
};

export default CategoryForm;