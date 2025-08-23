// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

// export const api = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${BASE_URL}/api/v1`,
//         // baseUrl: "https://smilies-log-distributed-fail.trycloudflare.com/api/v1",
//         prepareHeaders: (headers) => {
//             const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2OGE4OWMxNjg2YjBmMDU2ODY0N2E2ZWYiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiU1VQRVJfQURNSU4iLCJlbWFpbCI6InN1cGVyX2FkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc1NTk4NjUyNCwiZXhwIjoxNzU2ODUwNTI0fQ.XrQnrDwD6rJmHlp5a8FxYEIT8tHWsK1xwio0SwCAz9s";
//             if (token) {
//                 headers.set("authorization", `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     tagTypes: ["Support", "Users", "Auth", "Settings"],
//     endpoints: () => ({}),
// });

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

// export const api = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${BASE_URL}/api/v1`,
//         prepareHeaders: (headers) => {
//             const token = localStorage.getItem("accessToken");
//             if (token) {
//                 headers.set("authorization", `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     tagTypes: ["Support", "Users", "Auth", "Settings"],
//     endpoints: () => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

// Create a base query with token refresh logic
const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Enhanced base query with token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // If 401 Unauthorized, try to refresh token
    if (result?.error?.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
            try {
                // Try to refresh the token
                const refreshResult = await baseQuery(
                    {
                        url: "/auth/refresh-token",
                        method: "POST",
                        body: { refreshToken },
                    },
                    api,
                    extraOptions
                );

                if (refreshResult?.data) {
                    // Store the new access token
                    localStorage.setItem("accessToken", refreshResult.data.data.accessToken);

                    // Retry the original request with new token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // Refresh failed, clear tokens and redirect to login
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                }
            } catch (error) {
                console.log(error);
                // Refresh failed, clear tokens and redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        } else {
            // No refresh token, redirect to login
            window.location.href = "/login";
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Support", "Users", "Auth", "Settings"],
    endpoints: () => ({}),
});
