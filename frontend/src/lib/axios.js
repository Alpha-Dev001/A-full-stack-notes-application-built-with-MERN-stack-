import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:2000/api":"/api";
const api = axios.create({
    baseURL: BASE_URL, // Corrected from baseURl to baseURL
});

export default api;