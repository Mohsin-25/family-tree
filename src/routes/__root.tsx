import * as React from "react";
import { Outlet, createRootRoute, useMatchRoute } from "@tanstack/react-router";
import Navbar from "../modules/navbar";
// import bgImage from "../assets/forest-bg.jpeg";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();

  const isAuthPage =
    matchRoute({ to: "/signIn", fuzzy: true }) ||
    matchRoute({ to: "/forgotPassword", fuzzy: true }) ||
    matchRoute({ to: "inviteToken", fuzzy: true });

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <React.Fragment>
      <div className="relative bg-[#0C0C0C]">
        <Navbar />
        {/* <img
          src={bgImage}
          alt="forest background"
          className="fixed inset-0 w-full h-full object-cover object-center -z-10"
        /> */}
        <Outlet />
      </div>
    </React.Fragment>
  );
}
