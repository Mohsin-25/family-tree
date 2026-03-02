import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";
import { AppToastProvider } from "./components/Toast";

const router = createRouter({ routeTree });

function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && location.pathname !== "/signIn") {
      window.location.href = "/signIn";
    }
  }, [token, location.pathname]);

  return (
    <AppToastProvider>
      <RouterProvider router={router} />
    </AppToastProvider>
  );
}

export default App;
