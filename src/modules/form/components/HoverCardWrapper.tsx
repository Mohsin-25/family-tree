import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/hover-card";

export const HoverCardWrapper = ({ trigger, children, width = "w-64" }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">{trigger}</HoverCardTrigger>

      <HoverCardContent className={width}>{children}</HoverCardContent>
    </HoverCard>
  );
};
