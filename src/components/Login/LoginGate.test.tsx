import React from "react";
import LoginGate from "./LoginGate";
import * as state from "./state";
import { renderInAppContext } from "../../testUtils/renderUtils";

it("dispatches a check action", () => {
  const { getDispatchedActions } = renderInAppContext(
    <LoginGate>null</LoginGate>,
    {}
  );
  expect(getDispatchedActions()).toHaveLength(1);
});

it("renders a waiting message when there's no info", () => {
  const { getByText } = renderInAppContext(<LoginGate>null</LoginGate>, {});

  expect(getByText(/Checking your credentials/i)).toBeInTheDocument();
});

it("renders a login iframe when there's no login", () => {
  const { getByTestId, dispatch } = renderInAppContext(
    <LoginGate>null</LoginGate>,
    {}
  );

  dispatch(state.actions.setNotLoggedIn());

  expect(getByTestId("loginForm")).toBeInTheDocument();
});

it("renders children when there's a signed in user", () => {
  const { getByTestId, queryByTestId, dispatch } = renderInAppContext(
    <LoginGate>
      <div data-testid="success" />
    </LoginGate>,
    {}
  );

  dispatch(
    state.actions.setCurrentUser({
      fname: "",
      sname: "",
      public_email: "",
      bio: "",
      memberid: 123,
      photo: "",
      url: "",
    })
  );

  expect(queryByTestId("loginForm")).toBeNull();
  expect(getByTestId("success")).toBeInTheDocument();
});
