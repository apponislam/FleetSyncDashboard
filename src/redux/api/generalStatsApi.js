import { api } from "./baseApi";

export const generalStatsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get general stats
    getGeneralStats: builder.query({
      query: () => ({
        url: `/dashboard/general-stats`,
        method: "GET",
      }),
      transformResponse: (response) => response.data, 
    
    }),
  }),
});

export const { useGetGeneralStatsQuery } = generalStatsApi;
