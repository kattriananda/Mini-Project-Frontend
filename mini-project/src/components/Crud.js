import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/pos/api",
});
export const getProduct = async (search = "", categoryId = "", sortOrder= "", sortBy ="") => {
    let url = "/listproduct";
    const params = [];
    if (search) params.push(`title=${search}`);
    if (categoryId) params.push(`category=${categoryId}`);
    if (sortOrder) params.push(`sort_order=${sortOrder}`);
    if (sortBy) params.push(`sort_by=${sortBy}`);
    if (params.length) url += `?${params.join("&")}`;
    const response = await api.get(url);
    return response.data;
};
export const getProductById = async (id) => {
    const response = await api.get(`/detailproduct/${id}`);
    return response.data;
};
export const getCategoryById = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};
export const addProduct = async (product) => {
    const response = await api.post("/addproduct", product, {
        headers: {
            "Content-Type": "application/json", //format data yang dikirim adalah json
        },
    });
    return response.data;
};
export const addCatogory = async (category) => {
    const response = await api.post("/addcategory", category,{
        headers:{
            "Content-type" : "application/json",
        }
    }
)
}

export const updateProduct = async (id, product) =>{
    const response = await api.put(`/updateproduct/${id}`, product,{
         headers: {
                 'Content-Type' : 'application/json'}});
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await api.delete(`deleteproduct/${id}`,{
        headers: {
                'Content-Type' : 'application/json'}});
   return response.data;
};

// export const deleteCategory = async (id) => {
//     const response = await api.delete('categoriesDel')
// }
