import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthPage from "../modules/auth";

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
      <AuthPage />
    </div>
  );
}
