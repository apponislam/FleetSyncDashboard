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
      // now you'll directly get data.totalUser instead of data.data.totalUser
    }),
  }),
});

export const { useGetGeneralStatsQuery } = generalStatsApi;
