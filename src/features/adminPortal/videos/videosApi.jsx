import { apiSlice } from "../../api/apiSlice";
import { useVideoDetails } from "./videosSlice";

export const vidoesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: (data) => '/videos',
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(useVideoDetails(result.data[0]))
                } catch (err) {
                    // do nothing
                }
            },
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE",
            }),

            async onQueryStarted(id, { queryFulfilled, dispatch }) {

                // Optimistic way start

                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getVideos',
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

        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: {...data,createdAt:new Date(Date.now()).toISOString()},
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getVideos",
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

export const { useGetVideosQuery,useAddVideoMutation,useDeleteVideoMutation } = vidoesApi;
