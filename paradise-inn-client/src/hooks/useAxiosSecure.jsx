import axios from "axios";
import { useEffect } from "react";



const secureAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const useAxiosSecure = () => {


    useEffect(() => {
        secureAxios.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log("Tracked error in interceptor", error.response)
        })
    }, []);

    return secureAxios
};

export default useAxiosSecure;