import { profileApi } from '@/api'
import { ProfileWithIdeasResponse, UserProfileWithIdeas } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useProfilesWithIdeas(limit: number = 20, offset: number = 0) {
    return useQuery<ProfileWithIdeasResponse>({
        queryKey: ['profiles-with-ideas', limit, offset],
        queryFn: async () => {
            const response = await profileApi.getProfilesWithIdeas(limit, offset);
            
            // Transform the profiles to include the required properties
            const profilesWithIdeas: UserProfileWithIdeas[] = response.profiles.map(profile => ({
                ...profile,
                ideas: profile.ideas || [], // Add ideas if missing
                skills: profile.skills || [], // Add skills if missing
            }));
            
            return {
                ...response,
                profiles: profilesWithIdeas
            };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}