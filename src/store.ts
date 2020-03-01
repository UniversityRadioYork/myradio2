import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer, { AppState } from "./rootReducer";

const store = configureStore({
    reducer: rootReducer
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;