import { createFileRoute } from "@tanstack/react-router";
import MyTree from "../modules/tree";

export const Route = createFileRoute("/myTree")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MyTree />
    </div>
  );
}
