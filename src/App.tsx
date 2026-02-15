import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";

const router = createRouter({ routeTree });

function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && location.pathname !== "/signIn") {
      window.location.href = "/signIn";
    }
  }, [token, location.pathname]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
