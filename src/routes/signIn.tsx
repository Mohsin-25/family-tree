import { createFileRoute, redirect } from "@tanstack/react-router";
import NewAuth from "../modules/newAuth";

export const Route = createFileRoute("/signIn")({
  component: RouteComponent,
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    if (token) {
      throw redirect({ to: "/myTree" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <NewAuth />
    </div>
  );
}
