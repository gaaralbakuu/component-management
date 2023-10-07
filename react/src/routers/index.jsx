import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

export default createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);
