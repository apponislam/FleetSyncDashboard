import { api } from "../../api/baseApi";

export const publicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPublicContent: builder.query({
            query: (type) => `/public/${type}`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, type) => [{ type: "Public", id: type }],
        }),

        updatePublicContent: builder.mutation({
            query: ({ type, content }) => ({
                url: `/public`,
                method: "POST",
                body: { content, type },
            }),
            invalidatesTags: (result, error, { type }) => [{ type: "Public", id: type }],
        }),
    }),
});

export const { useGetPublicContentQuery, useUpdatePublicContentMutation } = publicApi;
