import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomeScreen } from "./HomeScreen";
import { MyRadioBodge } from "./MyRadioBodge";
import { CeedoxTestPage } from "./TestPages/Ceedox";
import MePage from "../modules/Profile/MePage";
import UserProfilePage from "../modules/Profile/UserProfile";
import ListShows from "../modules/Scheduler/ListShows";
import { SingleShowScreen } from "../modules/Scheduler/SingleShow";
// import { AnimateSharedLayout } from "framer-motion";

export const MyRadio2Pages: React.FC = () => (
  <>
    <div className="myr-main">
      <Switch>
        <Route path="/me" component={MePage} />
        <Route path="/profile/:id" component={UserProfilePage} />

        <Route path="/scheduler/shows">
          {/* <AnimateSharedLayout> */}
            <Switch>
              {/* Were it not for the Switch and this Route, we would render SingleShowScreen with an id of "createNew" */}
              <Route
                exact
                path="/scheduler/shows/createNew"
                component={ListShows}
              />
              <Route path="/scheduler/shows/:id" component={SingleShowScreen} />
              <Route path="/scheduler/shows" key="ListShowsScreen" component={ListShows} />
            </Switch>
          {/* </AnimateSharedLayout> */}
        </Route>

        <Route path="/$TEST$/ceedox" component={CeedoxTestPage} />

        <Route exact path="/" component={HomeScreen} />
        <Route component={MyRadioBodge} />
      </Switch>
      <footer>
        <small>MyRadio^2, git hash {process.env.REACT_APP_GIT_SHA}</small>
      </footer>
    </div>
  </>
);
