import { apiService } from "../apiService";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (postBody) => ({
        url: "auth/signup",
        method: "POST",
        body: postBody,
      }),
    }),

    login: builder.mutation({
      query: (postBody) => ({
        url: "/auth/login",
        method: "POST",
        body: postBody,
      }),
    }),

    profile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery } =
  authService;
