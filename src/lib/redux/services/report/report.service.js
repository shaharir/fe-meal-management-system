import { apiService } from "../apiService";

export const reportService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getBorderReport: builder.query({
      query: (pagination) => ({
        url: `/report/border${pagination}`,
        method: "GET",
      }),
    }),
    createDeposit: builder.mutation({
      query: (postBody) => ({
        url: "/deposit",
        method: "POST",
        body: postBody,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          apiService.util.updateQueryData("getDeposit", undefined, (draft) => {
            draft.push(arg); // push the new border to cache
          })
        );

        try {
          const { data: createdBorder } = await queryFulfilled;
          // Replace the optimistic entry with the actual created border from server
          dispatch(
            apiService.util.updateQueryData(
              "getDeposit",
              undefined,
              (draft) => {
                const index = draft.findIndex((b) => b === arg);
                if (index !== -1) draft[index] = createdBorder;
              }
            )
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreateDepositMutation, useGetBorderReportQuery } =
  reportService;
