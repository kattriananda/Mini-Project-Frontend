import axios from "axios";

const api = axios.create ( {
    baseURL : "http://localhost:8080/pos/api"
})
export const getProduct = async (search='', category = '') => {
    let url = '/listproduct';
    const params = [];
    if (search) params.push(`title=${search}`);
    if (category) params.push(`title=${category}`);
    if (params.length) url += `?${params.join('&')}`;
    const response = await api.get(url);
    return response.data;
}
export const getCategories = async () => {
    const response = await api.get("/getAll");
    return response.data;
}
export const deleteProduct = async (id) => {
    const response = await api.delete(`deleteproduct/${id}`)
    return response.data;
}