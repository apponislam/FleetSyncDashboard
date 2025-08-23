// api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1`,
        // baseUrl: "https://smilies-log-distributed-fail.trycloudflare.com/api/v1",
        prepareHeaders: (headers) => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2OGE4OWMxNjg2YjBmMDU2ODY0N2E2ZWYiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiU1VQRVJfQURNSU4iLCJlbWFpbCI6InN1cGVyX2FkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc1NTk4NjUyNCwiZXhwIjoxNzU2ODUwNTI0fQ.XrQnrDwD6rJmHlp5a8FxYEIT8tHWsK1xwio0SwCAz9s";
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Support", "Users", "Auth", "Settings"],
    endpoints: () => ({}),
});
