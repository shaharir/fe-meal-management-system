import { apiService } from "../apiService";

export const borderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getBorder: builder.query({
      query: (pagination) => ({
        url: `/border${pagination}`,
        method: "GET",
      }),
    }),
    createBorder: builder.mutation({
      query: (postBody) => ({
        url: "/border",
        method: "POST",
        body: postBody,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          apiService.util.updateQueryData("getBorder", undefined, (draft) => {
            draft.push(arg); // push the new border to cache
          })
        );

        try {
          const { data: createdBorder } = await queryFulfilled;
          // Replace the optimistic entry with the actual created border from server
          dispatch(
            apiService.util.updateQueryData("getBorder", undefined, (draft) => {
              const index = draft.findIndex((b) => b === arg);
              if (index !== -1) draft[index] = createdBorder;
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useCreateBorderMutation, useGetBorderQuery } = borderService;
