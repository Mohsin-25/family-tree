import * as React from "react";
import { Outlet, createRootRoute, useMatchRoute } from "@tanstack/react-router";
import Navbar from "../modules/navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();

  const isAuthPage = matchRoute({ to: "/signIn", fuzzy: true });

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
