import { Popover, PopoverContent } from "../../../components/ui/popover";

const PopoverWrapper = ({ open, onOpenChange, children }) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {/* You MUST include PopoverContent or nothing will render */}
      <PopoverContent className="w-auto">{children}</PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
