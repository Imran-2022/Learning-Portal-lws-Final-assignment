import { apiSlice } from "../../api/apiSlice";

export const vidoesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: (data) => '/videos',
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
            providesTags: ['videos']
        }),
    }),
});

export const { useGetVideosQuery } = vidoesApi;
