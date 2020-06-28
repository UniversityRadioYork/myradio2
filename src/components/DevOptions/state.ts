import { createSlice } from "@reduxjs/toolkit";

const devOptionsPopupSlice = createSlice({
  name: "DevOptionsPopup",
  initialState: {
    open: false,
  },
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
  },
});

export default devOptionsPopupSlice.reducer;

export const { open, close } = devOptionsPopupSlice.actions;
