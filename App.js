import React from "react";
import { Todo } from "./Todo";
import { store } from "./Store";
import { Provider } from "react-redux";

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Todo />
      </Provider>
    </>
  );
};
