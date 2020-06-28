import rootReducer from "../rootReducer";
import { Action, Middleware } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

export function renderWithRedux(
  component: React.ReactNode,
  { initialState = rootReducer(undefined, { type: "$INIT" }) }
) {
  const actions: Action[] = [];
  const observerMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action);
    return next(action);
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [observerMiddleware, ...getDefaultMiddleware()],
  });

  const utils = {
    dispatch(action: Action) {
      return store.dispatch(action);
    },
    getDispatchedActions() {
      return actions;
    },
    getState() {
      return store.getState();
    },
  };

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    ...utils,
  };
}
