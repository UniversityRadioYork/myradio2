import {configureStore, ThunkAction, Action, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer, { AppState } from "./rootReducer";
import {_syncEnvironmentMiddleware} from "./lib/myradio/request";

const store = configureStore({
    reducer: rootReducer,
    middleware: [
        _syncEnvironmentMiddleware,
        ...getDefaultMiddleware()
    ]
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;