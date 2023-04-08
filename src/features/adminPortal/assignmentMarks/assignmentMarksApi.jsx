import { apiSlice } from "../../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignmentMarks: builder.query({
            query: (data) => '/assignmentMark',
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
        getSingleAssignmentMarks: builder.query({
            query: (id) => `/assignmentMark/${id}`,
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // do anything !
                } catch (err) {
                    // do nothing
                }
            },
        }),
        updateAssignmentMarks: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignmentMarks",
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
                            "getSingleAssignmentMarks",
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
        addAssignmentMarks: builder.mutation({
            query: (data) => ({
                url: "/assignmentMark",
                method: "POST",
                body: { ...data, createdAt: new Date(Date.now()).toISOString() },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result.data,"result data");

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignmentMarks",
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

export const { useGetAssignmentMarksQuery, useUpdateAssignmentMarksMutation, useAddAssignmentMarksMutation,useGetSingleAssignmentMarksQuery } = assignmentMarksApi;
