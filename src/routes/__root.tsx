import * as React from "react";
import { Outlet, createRootRoute, useMatchRoute } from "@tanstack/react-router";
import Navbar from "../modules/navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();

  const isAuthPage =
    matchRoute({ to: "/signIn", fuzzy: true }) ||
    matchRoute({ to: "inviteToken", fuzzy: true });

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <React.Fragment>
      <div className="bg-background h-screen">
        <Navbar />
        <Outlet />
      </div>
    </React.Fragment>
  );
}
