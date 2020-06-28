import { combineReducers } from "redux";

import Login from "./components/Login/state";
import GlobalConfig from "./lib/globalConfig";
import FLIPS from "./lib/FLIPS/state";
import DevOptionsPopup from "./components/DevOptions/state";
import Nav from "./components/Navigation/state";

const rootReducer = combineReducers({
  Login,
  GlobalConfig,
  FLIPS,
  DevOptionsPopup,
  Nav,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
