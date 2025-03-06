export function useProfilesWithIdeas(limit: number = 20, offset: number = 0) {
    return useQuery<ProfilesResponse>({
      queryKey: ['profiles-with-ideas', limit, offset],
      queryFn: async () => {
        const response = await axios.get('/profiles-with-ideas', {
          params: { limit, offset }
        });
        return response.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  }