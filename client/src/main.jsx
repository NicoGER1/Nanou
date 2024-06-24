import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style/import.scss";

import App from "./App";
import Home from "./pages/Home";
import Children from "./pages/Children";
import Parents from "./pages/Parents";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/children",
        element: <Children />,
      },
      {
        path: "/parents",
        element: <Parents />,
      },
      {
        path: "/emergency",
        element: <Emergency />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
