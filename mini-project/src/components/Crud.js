import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/pos/api",
});
export const getProduct = async (search = "", categoryId = "") => {
    let url = "/listproduct";
    const params = [];
    if (search) params.push(`title=${search}`);
    if (categoryId) params.push(`category=${categoryId}`);
    if (params.length) url += `?${params.join("&")}`;
    const response = await api.get(url);
    return response.data;
};
export const getProductById = async (id) => {
    const response = await api.get(`/detailproduct/${id}`);
    return response.data;
};
export const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};
export const addProduct = async (product) => {
    const response = await api.post("/addproduct", product, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

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
// );
//     return response.data;
};
