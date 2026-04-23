import { createFileRoute } from "@tanstack/react-router";
import Invitation from "../../modules/collaboration/components/Invitation";

export const Route = createFileRoute("/inviteToken/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Invitation />;
}
