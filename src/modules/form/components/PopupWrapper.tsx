import { Theme } from "@radix-ui/themes";
import { Dialog, DialogContent } from "../../../components/ui/dialog";

const PopupWrapper = ({
  open,
  onOpenChange,
  children,
}: {
  open?: any;
  onOpenChange?: any;
  children?: any;
}) => {
  return (
    <div className="">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 border-none">
          <Theme>{children}</Theme>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupWrapper;
