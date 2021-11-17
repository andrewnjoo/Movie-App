import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./components/services/store";
import { Provider } from "react-redux";

//We render App into ReactDOM here
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
