import React from "react";
import { Switch, Route } from "react-router-dom";
import { QuotesPage } from "../modules/Quotes/QuotesPage";
import { HomeScreen } from "./HomeScreen";
import { MyRadioBodge } from "./MyRadioBodge";
import { CeedoxTestPage } from "./TestPages/Ceedox";
import MePage from "../modules/Profile/MePage";
import UserProfilePage from "../modules/Profile/UserProfile";
import ListShows from "../modules/Scheduler/ListShows";
import { SingleShowScreen } from "../modules/Scheduler/SingleShow";
import { AnimateSharedLayout } from "framer-motion";

export const MyRadio2Pages: React.FC = () => (
  <>
    <div className="myr-main">
      <Switch>
        <Route path="/quotes" component={QuotesPage} />

        <Route path="/me" component={MePage} />
        <Route path="/profile/:id" component={UserProfilePage} />

        <AnimateSharedLayout>
          <Route exact path="/scheduler/shows" component={ListShows} />
          <Route path="/scheduler/shows/:id" component={SingleShowScreen} />
        </AnimateSharedLayout>

        <Route path="/$TEST$/ceedox" component={CeedoxTestPage} />

        <Route exact path="/" component={HomeScreen} />
        <Route component={MyRadioBodge} />
      </Switch>
    </div>
  </>
);
