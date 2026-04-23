import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";
import { AppToastProvider } from "./components/Toast";

const router = createRouter({ routeTree });

function App() {
  const token = localStorage.getItem("token");
  const redirectTo = location.pathname?.includes("inviteToken")
    ? location.pathname
    : "/dashboard";

  useEffect(() => {
    if (!token && !location.pathname.includes("signIn")) {
      if (redirectTo) {
        window.location.href = `/signIn?redirectTo=${redirectTo}`;
      } else {
        window.location.href = `/signIn`;
      }
    }
  }, [token, location.pathname, redirectTo]);

  return (
    <AppToastProvider>
      <RouterProvider router={router} />
    </AppToastProvider>
  );
}

export default App;
