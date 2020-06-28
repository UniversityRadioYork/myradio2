import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { MyRadio2Pages } from "./pages";

import store from "./store";
import { Provider } from "react-redux";
import LoginGate from "./components/Login/LoginGate";
import Sidebar from "./components/Navigation/Sidebar";
import DevOptions from "./components/DevOptions";
import MyradioApolloProvider from "./lib/myradio/apollo";

const basepath =
  window.location.origin === "https://ury.org.uk"
    ? "/myradio2-alpha"
    : undefined;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MyradioApolloProvider>
        <BrowserRouter basename={basepath}>
          <LoginGate>
            <div className="myr-container">
              <Sidebar />
              <div className="myr-wrapper">
                <MyRadio2Pages />
              </div>
            </div>
            <footer>
              <small>MyRadio^2, git hash {process.env.REACT_APP_GIT_SHA}</small>
            </footer>
          </LoginGate>
          <DevOptions />
        </BrowserRouter>
      </MyradioApolloProvider>
    </Provider>
  );
};

export default App;
