import axios from 'axios'
import { ApiError } from '@/types'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    httpsAgent: true,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            console.log('Added auth token to request: Bearer [token]')
        } else {
            console.log('No auth token available for request')

        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.data === 401) {
            localStorage.removeItem('token')
            window.location.href = '/auth/login'
        }

        if (error.response) {
            return Promise.reject(error.response.data as ApiError)
        }
        return Promise.reject({ message: 'Something went wrong' })
    }
)