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
        updateUserBasicInfo: builder.mutation({
            query: (userData) => ({
                url: `/user/basic-info`,
                method: "PATCH",
                body: userData,
            }),
        }),
        uploadProfileImage: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append("images", file);

                return {
                    url: `/user/profile-image`,
                    method: "PATCH",
                    body: formData,
                };
            },
        }),
        changePassword: builder.mutation({
            query: (passwordData) => ({
                url: `/auth/change-password`,
                method: "POST",
                body: passwordData,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useUpdateUserBasicInfoMutation, useUploadProfileImageMutation, useChangePasswordMutation } = usersApi;
