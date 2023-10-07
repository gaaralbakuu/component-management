import React from "react";
import ReactDOM from "react-dom/client";
import "@/app/globals.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/index";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import "@fontsource-variable/raleway";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={routers}></RouterProvider>
    </Provider>
);
