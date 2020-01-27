import React from "react";
import { Switch, Route } from "react-router-dom";
import { QuotesPage } from "./Quotes";
import { HomeScreen } from "./HomeScreen";
import { MyRadioBodge } from "./MyRadioBodge";

export const MyRadio2Pages: React.FC = () => (
  <>
    <div className="myr-main">
      <Switch>
        <Route path="/quotes" component={QuotesPage} />
        <Route exact path="/" component={HomeScreen} />
        <Route component={MyRadioBodge} />
      </Switch>
    </div>
  </>
);
