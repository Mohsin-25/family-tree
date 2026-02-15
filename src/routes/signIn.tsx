import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthPage from "../modules/auth";

export const Route = createFileRoute("/signIn")({
  component: RouteComponent,
  beforeLoad: () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      throw redirect({ to: "/" });
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
