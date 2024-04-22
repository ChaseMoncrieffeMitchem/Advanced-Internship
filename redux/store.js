import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import { booksApi } from "./bookApiSlice";

export default configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    [booksApi.reducerPath]: booksApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});
