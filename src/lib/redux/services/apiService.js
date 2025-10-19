import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  return localStorage.getItem("token");
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",

  prepareHeaders: (headers) => {
    const token = getBearerToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiService = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
