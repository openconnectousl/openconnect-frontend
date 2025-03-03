import axios from 'axios'
import { ApiError } from '@/types'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    httpsAgent: true,
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data as ApiError)
        }
        return Promise.reject({ message: 'Something went wrong' })
    }
)
