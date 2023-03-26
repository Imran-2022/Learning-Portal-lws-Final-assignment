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
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: {...data,createdAt:new Date(Date.now()).toISOString()},
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(useVideoDetails(result.data[0]))
                } catch (err) {
                    // do nothing
                }
            },
        }),
    }),
});

export const { useGetVideosQuery,useAddVideoMutation } = vidoesApi;
