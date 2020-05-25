import React from "react";
import { Switch, Route } from "react-router-dom";
import { QuotesPage } from "../modules/Quotes/QuotesPage";
import { HomeScreen } from "./HomeScreen";
import { MyRadioBodge } from "./MyRadioBodge";
import {CeedoxTestPage} from "./TestPages/Ceedox";

export const MyRadio2Pages: React.FC = () => (
  <>
    <div className="myr-main">
      <Switch>
        <Route path="/quotes" component={QuotesPage} />

        <Route path="/$TEST$/ceedox" component={CeedoxTestPage} />

        <Route exact path="/" component={HomeScreen} />
        <Route component={MyRadioBodge} />
      </Switch>
    </div>
  </>
);
