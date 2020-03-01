import { combineReducers } from "redux";

import Login from "./components/Login/state"

const rootReducer = combineReducers({
    Login
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;