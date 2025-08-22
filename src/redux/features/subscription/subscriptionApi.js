import { api } from "./baseApi";

export const subscribedUsersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSubscribedUsers: builder.query({
            query: (params) => ({
                url: `/dashboard/all-subscribed-users`,
                method: "GET",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    ...(params?.searchTerm && { searchTerm: params.searchTerm }),
                    ...(params?.role && { role: params.role }),
                },
            }),
            transformResponse: (response) => response.data,
            providesTags: ["SubscribedUsers"],
        }),
    }),
});

export const { useGetSubscribedUsersQuery } = subscribedUsersApi;
