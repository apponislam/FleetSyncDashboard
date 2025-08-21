import { api } from "./baseApi";

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page = 1, limit = 10, searchTerm = "", role = "" }) => ({
                url: `/user`,
                method: "GET",
                params: {
                    page,
                    limit,
                    ...(searchTerm && { searchTerm }),
                    ...(role && { role }),
                },
            }),
            transformResponse: (response) => response.data,
            providesTags: ["Users"],
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
