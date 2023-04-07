import { apiSlice } from "../../api/apiSlice";
import { useVideoDetails } from "./videosSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all videos
    getVideos: builder.query({
      query: () => '/videos',

      // Run this function when the query is started
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Update the video details with the first video in the response
          dispatch(useVideoDetails(result.data[0]));
        } catch (err) {
          // Do nothing if there's an error
        }
      },
    }),

    // Query to get a single video by ID
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,

      // Run this function when the query is started
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Do anything else needed with the response data
        } catch (err) {
          // Do nothing if there's an error
        }
      },
    }),

    // Mutation to delete a video by ID
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),

      // Run this function when the mutation is started
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        // Optimistically update the videos list by removing the deleted video
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            return draft.filter((video) => video.id !== id);
          })
        );

        try {
          // Wait for the mutation to complete
          await queryFulfilled;
        } catch (err) {
          // Undo the optimistic update if there's an error
          patchResult.undo();
        }
      },
    }),

    // Mutation to add a new video
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: { ...data, createdAt: new Date(Date.now()).toISOString() },
      }),

      // Run this function when the mutation is started
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // Pessimistically update the videos list by adding the new video
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(result.data);
            })
          );
        } catch (err) {
          // Do nothing if there's an error
        }
      },
    }),

    // Mutation to update an existing video by ID
    updateVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: { ...data, createdAt: new Date(Date.now()).toISOString() },
      }),

      // Run this function when the mutation is started
      async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // Pessimistically update the videos list and video details with the updated video
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              return draft.map((video) => {
                if (video.id == id) {
                  return result.data;
                }
                return video;
              });
            })
          );

          dispatch(
            apiSlice.util.updateQueryData("getVideo", id, (draft) => {
              return result.data;
            })
          );
        } catch (err) {
          // Do nothing if there's an error
        }
      },
    }),
  }),
});

// Export the generated hooks for each endpoint
export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetVideoQuery,
  useUpdateVideoMutation,
} = videosApi;
