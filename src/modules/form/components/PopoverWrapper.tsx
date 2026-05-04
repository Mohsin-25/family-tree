import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

const PopoverWrapper = ({
  open,
  onOpenChange,
  children,
  triggerBtn,
}: {
  open?: any;
  onOpenChange?: any;
  children?: any;
  triggerBtn?: any;
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {/* Hidden anchor element */}
      <PopoverTrigger asChild>{triggerBtn()}</PopoverTrigger>
      <PopoverContent className="w-auto">{children}</PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
