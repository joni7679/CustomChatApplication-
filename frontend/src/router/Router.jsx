import { createBrowserRouter } from "react-router";
import Dashboard from "../ADMIN/components/Dashboard";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "admin",
        element: <Dashboard/>,
    },
]);
