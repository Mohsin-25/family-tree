import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

const PopoverWrapper = ({
  open,
  onOpenChange,
  children,
}: {
  open?: any;
  onOpenChange?: any;
  children?: any;
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {/* Hidden anchor element */}
      <PopoverTrigger asChild>
        <span className="hidden w-full h-full" />
      </PopoverTrigger>

      <PopoverContent className="w-auto">{children}</PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
