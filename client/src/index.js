import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import { userLoggedIn } from "./features/auth/authSlice";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const localAuth = localStorage?.getItem("auth");

if (localAuth) {
  const auth = JSON.parse(localAuth);
  if (auth?.accessToken && auth?.user) {
    store.dispatch(
      userLoggedIn({ accessToken: auth.accessToken, user: auth.user })
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
