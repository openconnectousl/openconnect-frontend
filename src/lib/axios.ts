import axios from 'axios'
import { ApiError } from '@/types'
import { isTokenValid } from './utils'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    httpsAgent: true,
})

axiosInstance.interceptors.request.use(
    (config) => {

        if (isTokenValid()) {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
                console.log('Added auth token to request: Bearer [token]')
            } else {
                localStorage.removeItem('token')
                localStorage.removeItem('token_expiry')
                console.log('No valid auth token available for request')
            }
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
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('token_expiry')
            window.location.href = '/auth/login'

            if (!window.location.pathname.includes('/auth/')) {
                window.location.href = '/auth/login'
              }
            }

        return Promise.reject(error)
    }
)
