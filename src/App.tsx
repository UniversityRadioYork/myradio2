import React from "react";
import "./App.scss";
import { BrowserRouter, useHistory } from "react-router-dom";
import { MyRadio2Pages } from "./pages";
import { Menu, FormGroup, InputGroup, Card } from "@blueprintjs/core";

import store from "./store";
import { Provider } from "react-redux";
import LoginGate from "./components/Login/LoginGate";
import Sidebar from "./components/Navigation/Sidebar";
import DevOptions from "./components/DevOptions";

const basepath =
  window.location.origin === "https://ury.org.uk"
    ? "/myradio2-alpha"
    : undefined;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={basepath}>
        <LoginGate>
          <div className="myr-container">
            <Sidebar />
            <div className="myr-wrapper">
              <MyRadio2Pages />
            </div>
          </div>
        </LoginGate>
        <DevOptions />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
