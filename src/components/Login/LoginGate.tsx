import React, { useLayoutEffect, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../rootReducer";
import * as state from "./state";

const LoginGate: React.FC = ({ children }) => {
  const isSignedIn = useSelector((state: AppState) => state.Login.signedIn);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      console.log("got sign-in iFrame event", e);
      if (e.data === "myradio:signedIn") {
        dispatch(state.checkSignIn());
      }
    };
    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  });

  useEffect(() => {
    dispatch(state.checkSignIn());
  }, []);

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
            src="https://ury.org.uk/myradio-dev/MyRadio/login/?next=%2fmyradio-dev%2fMyRadio%2fmyr2Handoff%3fnonav%3dtrue&nonav=true"
            className="myr-login-frame"
          />
        </div>
      );
    default:
      throw new Error();
  }
};

export default LoginGate;
