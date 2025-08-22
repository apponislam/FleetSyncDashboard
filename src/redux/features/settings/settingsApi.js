import { api } from "../../api/baseApi";

export const supportApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSupportTickets: builder.query({
            query: ({ page = 1, limit = 10, status = "" }) => ({
                url: `/support`,
                method: "GET",
                params: {
                    page,
                    limit,
                    ...(status && { status }),
                },
            }),
            transformResponse: (response) => ({
                supports: response.data.data,
                meta: response.data.meta,
            }),
            providesTags: (result) => (result ? [...result.supports.map(({ _id }) => ({ type: "Support", id: _id })), { type: "Support", id: "LIST" }] : [{ type: "Support", id: "LIST" }]),
        }),

        updateSupportTicket: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `/support/${id}`,
                method: "PATCH",
                body: updates,
            }),
            // Fixed: Simplified invalidatesTags without function
            invalidatesTags: ["Support"],
        }),
        deleteSupportTicket: builder.mutation({
            query: (id) => ({
                url: `/support/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Support"],
        }),
    }),
});

export const { useGetSupportTicketsQuery, useUpdateSupportTicketMutation, useDeleteSupportTicketMutation } = supportApi;
