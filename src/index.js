import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./Assets/Global.css";
import "./Assets/Page.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { store } from "./Context/store.redux";
import { Provider } from "react-redux";
import { Loading } from "./Components/Loading/Loading";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-left" />
        <Loading />
        <Router />
      </BrowserRouter>
    </Provider>
  </Fragment>
);
