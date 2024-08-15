import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/app.scss";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { addAdmin } from "./firebase/adminSetup"; 

const adminEmail = "vusal.osmanov66@gmail.com";
addAdmin(adminEmail);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
    
  </Provider>
);
