import { combineReducers } from "redux";

import Login from "./components/Login/state"
import GlobalConfig from "./lib/globalConfig";

const rootReducer = combineReducers({
    Login,
    GlobalConfig
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;