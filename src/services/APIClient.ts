import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type {FetchResponse} from "../types";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res.data)
            .catch(error => {
                console.error(`Error fetching from ${this.endpoint}:`, error);
                throw error;
            });
    }
}

export default APIClient;
