import { api } from "../../api/baseApi";

export const subscriptionPlansApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get all subscription plans
        getSubscriptionPlans: builder.query({
            query: () => ({
                url: `/subscription/admin/plans`,
                method: "GET",
            }),
            transformResponse: (response) => response.data,
            providesTags: ["SubscriptionPlans"],
        }),

        // Get single subscription plan by ID
        getSubscriptionPlan: builder.query({
            query: (id) => ({
                url: `/subscription/plans/${id}`,
                method: "GET",
            }),
            transformResponse: (response) => response.data,
            providesTags: (result, error, id) => [{ type: "SubscriptionPlan", id }],
        }),

        // Create new subscription plan
        createSubscriptionPlan: builder.mutation({
            query: (planData) => ({
                url: `/subscription/admin/plans`,
                method: "POST",
                body: planData,
            }),
            invalidatesTags: ["SubscriptionPlans"],
        }),

        // Update subscription plan
        updateSubscriptionPlan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/subscription/admin/plans/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["SubscriptionPlans", { type: "SubscriptionPlan", id }],
        }),
    }),
});

export const { useGetSubscriptionPlansQuery, useGetSubscriptionPlanQuery, useCreateSubscriptionPlanMutation, useUpdateSubscriptionPlanMutation } = subscriptionPlansApi;
