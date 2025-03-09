import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}





export const isTokenValid = (): boolean => {
    const token = localStorage.getItem('token')
    const expiry = localStorage.getItem('token_expiry')

    if (!token || !expiry) {
        return false  
    }

    const expiryDate = new Date(expiry)
    const now = new Date()
    return expiryDate > now
}




