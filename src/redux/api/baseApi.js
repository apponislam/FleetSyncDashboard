// api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1`,
        // baseUrl: "https://smilies-log-distributed-fail.trycloudflare.com/api/v1",
        prepareHeaders: (headers) => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2ODgzNzZhZTc4ZTExMjAzYTBiZWVjZGYiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiU1VQRVJfQURNSU4iLCJlbWFpbCI6InN1cGVyX2FkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc1NTYyNDU5NSwiZXhwIjoxNzU2NDg4NTk1fQ.sC7M8Efi5A0xMsEvf3jqCOcrcMTBMG1mOR6kdbTQAXU";
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Support", "Users", "Auth", "Settings"],
    endpoints: () => ({}),
});
