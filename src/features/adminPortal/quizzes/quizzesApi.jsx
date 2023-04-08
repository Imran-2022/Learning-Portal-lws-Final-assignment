import { apiSlice } from "../../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: (data) => '/quizzes',
        }),
        getQuiz: builder.query({
            query: (id) => `/quizzes/${id}`,
        }),
        addQuiz: builder.mutation({
            query: (data) => ({
                url: "/quizzes",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuizzes",
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
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE",
            }),

            async onQueryStarted(id, { queryFulfilled, dispatch }) {

                // Optimistic way start

                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getQuizzes',
                        undefined,
                        (draft) => {
                            return draft.filter(dt => dt.id != id)
                        }
                    )
                )
                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResult.undo();
                }

                // Optimistic way end

            },
        }),
        updateQuiz: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuizzes",
                            undefined,
                            (draft) => {
                                return draft.map(dt => {
                                    if (dt.id == id) {
                                        return result.data;
                                    }
                                    return dt;
                                })
                            }
                        )
                    )
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuiz",
                            id,
                            (draft) => {
                                return result.data;
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

export const { useGetQuizzesQuery, useAddQuizMutation, useDeleteQuizMutation, useGetQuizQuery, useUpdateQuizMutation } = quizzesApi;
