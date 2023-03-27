import { apiSlice } from "../../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: (data) => '/assignments',
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
        getSingleAssignment: builder.query({
            query: (id) => `/assignments/${id}`,
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // do anything !
                } catch (err) {
                    // do nothing
                }
            },
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: "/assignments",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignments",
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
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE",
            }),

            async onQueryStarted(id, { queryFulfilled, dispatch }) {

                // Optimistic way start

                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getAssignments',
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
        updateAssignment : builder.mutation({
            query: ({ id, data }) => ({
                url:  `/assignments/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignments",
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
                            "getSingleAssignment",
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

export const { useGetAssignmentsQuery,useAddAssignmentMutation,useDeleteAssignmentMutation,useGetSingleAssignmentQuery,useUpdateAssignmentMutation } = assignmentApi;
