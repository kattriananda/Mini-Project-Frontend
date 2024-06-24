import axios from "axios";

const api = axios.create ( {
    baseURL : "http://localhost:8080/pos/api"
})
export const getProduct = async () => {
    const response = await api.get("/listproduct");
    return response.data;
}
export const getCategories = async () => {
    const response = await api.get("/getAll");
    return response.data;
}