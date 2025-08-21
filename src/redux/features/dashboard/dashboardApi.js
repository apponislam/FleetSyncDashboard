import { api } from "../../api/baseApi";

export const dashBoardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRevenue: builder.query({
            query: (params) => ({
                url: `/dashboard/revenues`,
                method: "GET",
                params: params,
            }),
            transformResponse: (response) => response.data,
            providesTags: ["Revenue"],
        }),
        getUserAccountCreation: builder.query({
            query: (params) => ({
                url: `/dashboard/user-account-creation`,
                method: "GET",
                params: params,
            }),
            transformResponse: (response) => response.data,
            providesTags: ["UserAccounts"],
        }),
    }),
});

export const { useGetRevenueQuery, useGetUserAccountCreationQuery } = dashBoardApi;
