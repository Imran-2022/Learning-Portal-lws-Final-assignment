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
        // getquizMark: builder.query({
        //     query: (id) => ({
        //         url: `/quizMark/${id}`,
        //     }),
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {
        //             const result = await queryFulfilled;

        //         } catch (err) {
        //             // do nothing

        //         }
        //     },
        // }),
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

                    // dispatch(
                    //     apiSlice.util.updateQueryData(
                    //         "getquizMark",
                    //         arg.id,
                    //         (draft) => {
                    //             return result.data;
                    //         }
                    //     )
                    // )

                    // end pessimistic way ->

                } catch (err) {
                    // do nothing

                }
            },
        }),
    }),
});

export const { useGetquizMarksQuery, useAddQuizMarksMutation } = quizMarkApi;
