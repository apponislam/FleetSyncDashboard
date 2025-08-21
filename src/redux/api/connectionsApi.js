import { api } from "./baseApi";
export const connectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConnections: builder.query({
      query: ({ page = 1, limit = 10, searchTerm = "", role = "" }) => ({
        url: `dashboard/users-connections`,
        method: "GET",
        params: { page, limit, searchTerm, role },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetConnectionsQuery } = connectionsApi;
