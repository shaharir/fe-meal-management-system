import { apiService } from "../apiService";

export const dashboardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getDashBoard: builder.query({
      query: () => ({
        url: `/dashboard`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashBoardQuery } = dashboardService;
