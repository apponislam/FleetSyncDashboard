import { api } from "../../api/baseApi";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (loginData) => ({
                url: `/auth/login`,
                method: "POST",
                body: loginData,
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: `/auth/refresh-token`,
                method: "POST",
                body: {
                    refreshToken: localStorage.getItem("refreshToken"),
                },
            }),
        }),
    }),
});

export const { useAdminLoginMutation } = authApi;
