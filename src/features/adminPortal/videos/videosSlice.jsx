import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videoDetails: {},
};

const videosSlice = createSlice({
    name: "videoDetails",
    initialState,
    reducers: {
        useVideoDetails: (state, action) => {
            state.videoDetails = action.payload;
        },
    },
});

export const { useVideoDetails } = videosSlice.actions;
export default videosSlice.reducer;
