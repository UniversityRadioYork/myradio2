import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { user } from "../../lib/myradio";
import { MyRadioApiError } from "../../lib/myradio/request";
import { Member } from "../../lib/myradio/user";

interface LoginState {
  signedIn: boolean | null;
  currentUser: Member | null;
}

const login = createSlice({
  name: "LoginModal",
  initialState: {
    signedIn: null,
  } as LoginState,
  reducers: {
    setNotLoggedIn(state) {
      state.signedIn = false;
    },
    setCurrentUser(state, action: PayloadAction<Member>) {
      state.currentUser = action.payload;
      state.signedIn = true;
    },
  },
});

export default login.reducer;

export const actions = login.actions;

export const checkSignIn = (): AppThunk => async (dispatch) => {
  try {
    const result = await user.currentUser();
    dispatch(login.actions.setCurrentUser(result));
  } catch (e) {
    if (
      e instanceof MyRadioApiError &&
      e.message === "No valid authentication data provided."
    ) {
      dispatch(login.actions.setNotLoggedIn());
    } else {
      throw e;
    }
  }
};
