import * as Toast from "@radix-ui/react-toast";
import * as React from "react";

type ToastType = "success" | "error" | "info";

type ToastState = {
  open: boolean;
  title?: string;
  description?: string;
  type?: ToastType;
};

const ToastContext = React.createContext<{
  showToast: (data: Omit<ToastState, "open">) => void;
} | null>(null);

export const AppToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = React.useState<ToastState>({
    open: false,
  });

  const showToast = (data: Omit<ToastState, "open">) => {
    setToast({ ...data, open: true });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}

        <Toast.Root
          open={toast.open}
          onOpenChange={(open) => setToast((prev) => ({ ...prev, open }))}
          duration={3000}
          className={`flex flex-col gap-1 rounded-md p-4 shadow-lg transition-all
  ${
    toast.type === "success"
      ? "bg-green-50 border border-green-400"
      : toast.type === "error"
        ? "bg-red-50 border border-red-400"
        : "bg-white border"
  }`}
        >
          <Toast.Title className="font-semibold">{toast.title}</Toast.Title>

          {toast.description && (
            <Toast.Description className="text-sm opacity-80">
              {toast.description}
            </Toast.Description>
          )}
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-[350px] max-w-[100vw] outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useAppToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useAppToast must be used within AppToastProvider");
  }
  return context;
};
