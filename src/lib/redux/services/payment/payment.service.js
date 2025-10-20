import { apiService } from "../apiService";

export const paymentService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: (value) => ({
        url: `/payment/${value}`,
        method: "GET",
      }),
    }),
    createPayment: builder.mutation({
      query: (postBody) => ({
        url: "/payment",
        method: "POST",
        body: postBody,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          apiService.util.updateQueryData("getPayment", undefined, (draft) => {
            draft.push(arg); // push the new border to cache
          })
        );

        try {
          const { data: createdBorder } = await queryFulfilled;
          // Replace the optimistic entry with the actual created border from server
          dispatch(
            apiService.util.updateQueryData(
              "getPayment",
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

export const { useCreatePaymentMutation, useGetPaymentQuery } = paymentService;
