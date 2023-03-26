import { apiSlice } from "../../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getquizMarks: builder.query({
            query: (data) => '/quizMark',
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // try {
                //     const result = await queryFulfilled;
                //     dispatch(
                //         addTasks(result.data)
                //     );
                // } catch (err) {
                //     // do nothing
                // }
            },
        }),
    }),
});

export const { useGetquizMarksQuery } = quizMarkApi;
