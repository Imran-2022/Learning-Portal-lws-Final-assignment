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
    }),
});

export const { useGetAssignmentsQuery,useAddAssignmentMutation } = assignmentApi;
