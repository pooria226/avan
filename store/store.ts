import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import LoaderReducer from "./loaderSlice";
import themeReducer from "./themeSlice";

const rootReducer = {
  [api.reducerPath]: api.reducer,
  theme: themeReducer,
  loader: LoaderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
