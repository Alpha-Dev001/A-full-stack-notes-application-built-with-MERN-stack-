import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:2000/api", // Corrected from baseURl to baseURL
});

export default api;