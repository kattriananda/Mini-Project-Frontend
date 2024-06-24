import axios from "axios";

const api = axios.create ( {
    baseURL : "http://localhost:3000"
})
export const getProduct = async () => {
    const response = await api.get("/products");
    return response.data;
}
export const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
}