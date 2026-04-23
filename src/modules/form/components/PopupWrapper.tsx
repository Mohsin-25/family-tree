import { Theme } from "@radix-ui/themes";
import { Dialog, DialogContent } from "../../../components/ui/dialog";

const PopupWrapper = ({
  open,
  onOpenChange,
  children,
  className,
}: {
  open?: any;
  onOpenChange?: any;
  children?: any;
  className?: any;
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`p-0 border-none ${className}`}>
          <Theme>{children}</Theme>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupWrapper;
