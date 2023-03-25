import { configureStore } from "@reduxjs/toolkit";
import videosSlice from "../features/adminPortal/videos/videosSlice";
import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        videoDetails:videosSlice,
       
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});
