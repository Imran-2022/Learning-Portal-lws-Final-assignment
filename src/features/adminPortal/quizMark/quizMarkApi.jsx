import { apiSlice } from "../../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getquizMarks: builder.query({
            query: (data) => '/quizMark',
        }),
     
        addQuizMarks: builder.mutation({
            query: (data) => ({
                url: "/quizMark",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getquizMarks",
                            undefined,
                            (draft) => {
                                draft.push(result.data);
                            }
                        )
                    )

                    // end pessimistic way ->

                } catch (err) {
                    // do nothing

                }
            },
        }),
    }),
});

export const { useGetquizMarksQuery, useAddQuizMarksMutation } = quizMarkApi;
