import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "../modules/auth/forgotPassword";

export const Route = createFileRoute("/forgotPassword")({
  validateSearch: (search) => ({
    redirectTo: typeof search.redirectTo === "string" ? search.redirectTo : "",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}
