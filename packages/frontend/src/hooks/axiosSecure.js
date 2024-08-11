import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:8000/api/v1'
});

const useAxiosSecure = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            // console.log(config)
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => {
                // console.log(response)
                return response
            },
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate]);

    return [axiosSecure];
};

export default useAxiosSecure;