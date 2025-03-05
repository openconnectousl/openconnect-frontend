import { profileApi } from '@/api'
import { useAuth } from '@/context/AuthContext'
import { User } from '@/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useProfile() {
    const queryClient = useQueryClient()
    const { user: authUser } = useAuth()

    const { data: profile, isLoading, error, refetch } = useQuery({
        queryKey: ['profile', authUser?.id],
        queryFn: () => profileApi.getCurrentProfile(),
        enabled: !!authUser?.id,
    })

    const { mutate: updateProfile, isPending: isUpdating } = useMutation({
        mutationFn: (data: Partial<User>) => profileApi.updateProfile(data),
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(['profile', authUser?.id], updatedProfile)
            toast.success('Profile updated successfully')
        },

        onError: (error: any) => {
            toast.error(error.message || 'Failed to update profile')
        }
    })

    return {
        profile, 
        isLoading,
        error,
        updateProfile,
        isUpdating,
        refetch,
    }
    

}


    