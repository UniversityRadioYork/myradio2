import React from "react";
import "./App.scss";
import { BrowserRouter, useHistory } from "react-router-dom";
import { MyRadio2Pages } from "./pages";
import { Menu, FormGroup, InputGroup, Card } from "@blueprintjs/core";

import store from "./store";
import { Provider } from "react-redux";
import LoginGate from "./components/Login/LoginGate";
import Sidebar from "./components/Navigation/Sidebar";

const basepath =
  window.location.origin === "https://ury.org.uk"
    ? "/myradio2-alpha"
    : undefined;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={basepath}>
        <div className="myr-container">
          <Sidebar />
          <div className="myr-wrapper">
            <LoginGate>
              <MyRadio2Pages />
            </LoginGate>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
