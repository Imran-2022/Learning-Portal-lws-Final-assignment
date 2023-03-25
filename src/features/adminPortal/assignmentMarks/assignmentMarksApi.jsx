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
    }),
});

export const { useGetAssignmentMarksQuery } = assignmentMarksApi;
