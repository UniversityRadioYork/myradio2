import React, { useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../rootReducer";
import * as state from "./state";
import MyRadioEnvironments from "../../lib/myradio/environments";

const LoginGate: React.FC = ({ children }) => {
  const isSignedIn = useSelector((state: AppState) => state.Login.signedIn);
  const myrConfig = useSelector(
    (state: AppState) => state.GlobalConfig.myradio
  );
  const env = MyRadioEnvironments[myrConfig.environment];
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      if (e.data === "myradio:signedIn") {
        dispatch(state.checkSignIn());
      }
    };
    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  });

  useEffect(() => {
    dispatch(state.checkSignIn());
  }, [dispatch]);

  switch (isSignedIn) {
    case true:
      if (typeof children !== "undefined") {
        return children as any;
      } else {
        throw new Error("LoginGate expected children!");
      }
    case null:
      return (
        <div className="myr-login-backdrop">
          <div className="myr-login-main">
            <b>Checking your credentials, please wait...</b>
          </div>
        </div>
      );
    case false:
      return (
        <div className="myr-login-backdrop">
          <iframe
            title="Sign in form"
            data-testid="loginForm"
            src={`${env.webBase}/MyRadio/login/?next=${encodeURIComponent(
              `${env.webBase}/MyRadio/myr2Handoff?nonav=true`
            )}&nonav=true`}
            className="myr-login-frame"
          />
        </div>
      );
    default:
      throw new Error();
  }
};

export default LoginGate;
