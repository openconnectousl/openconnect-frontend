import { profileApi } from '@/api'
import { ProfileWithIdeasResponse } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useProfilesWithIdeas(limit: number = 20, offset: number = 0) {
    return useQuery<ProfileWithIdeasResponse>({
        queryKey: ['profiles-with-ideas', limit, offset],
        queryFn: () => profileApi.getProfilesWithIdeas(limit, offset),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
