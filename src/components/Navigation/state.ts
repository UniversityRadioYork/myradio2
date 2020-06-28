import { createSlice } from "@reduxjs/toolkit";

const globalNavState = createSlice({
  name: "GlobalNav",
  initialState: {
    globalSpinnerVisible: false,
  },
  reducers: {
    showGlobalSpinner(state) {
      state.globalSpinnerVisible = true;
    },
    hideGlobalSpinner(state) {
      state.globalSpinnerVisible = false;
    },
  },
});

export default globalNavState.reducer;

const { hideGlobalSpinner, showGlobalSpinner } = globalNavState.actions;
export { hideGlobalSpinner, showGlobalSpinner };
