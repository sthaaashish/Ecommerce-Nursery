import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { store } from "./features/store.jsx";
import "./index.css";
import ScrollToTop from "./Components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-cb4e4qqb6uofpxkb.us.auth0.com"
    clientId="T2SVsvXVe457GwYqnN62P0WD9Dj5Y99G"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </BrowserRouter>
  </Auth0Provider>
);
