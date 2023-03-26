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
        getVideo: builder.query({
            query: (id) => `/videos/${id}`,
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // do anything !
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
        updateVideo : builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getVideos",
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

                    // end pessimistic way ->

                } catch (err) {
                    // do nothing

                }
            },
        }),
    }),
});

export const { useGetVideosQuery,useAddVideoMutation,useDeleteVideoMutation,useGetVideoQuery,useUpdateVideoMutation } = vidoesApi;
