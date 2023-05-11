import { createSlice } from "@reduxjs/toolkit";

const LoaderSlice = createSlice({
  name: "loader",
  initialState: true,
  reducers: {
    setLoader: (_, action) => {
      return action.payload;
    },
  },
});

export const { setLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
