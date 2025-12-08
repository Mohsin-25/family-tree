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
        <DialogContent className="p-0 border-none">{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupWrapper;
