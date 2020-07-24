import rootReducer, { AppState } from "../rootReducer";
import { Action, Middleware } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import * as history from "history";
import { Router } from "react-router-dom";

export function renderInAppContext(
  component: React.ReactNode,
  options: {
    initialState?: AppState;
    historyOptions?: history.MemoryHistoryBuildOptions;
  } = {}
) {
  const actions: Action[] = [];
  const observerMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action);
    return next(action);
  };

  const initialState =
    typeof options.initialState === undefined
      ? rootReducer(undefined, { type: "$INIT" })
      : options.initialState;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [observerMiddleware, ...getDefaultMiddleware()],
  });

  const hist = history.createMemoryHistory(options.historyOptions);

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
    ...render(
      <Provider store={store}>
        <Router history={hist}>{component}</Router>
      </Provider>
    ),
    ...utils,
    history: hist,
  };
}
