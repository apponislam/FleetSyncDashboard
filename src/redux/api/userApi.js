// userApi.js
import { api } from "./baseApi";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/user`,
        method: "GET",
        params: { page, limit },
      }),
      // ✅ Keep both meta and data
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
