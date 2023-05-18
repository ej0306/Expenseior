import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import store from "./redux/store";
import { Provider } from "react-redux";
import "remixicon/fonts/remixicon.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Notifications position="top-right" />
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>
);

reportWebVitals();
