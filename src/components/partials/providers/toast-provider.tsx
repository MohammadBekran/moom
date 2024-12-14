import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      theme="dark"
      toastOptions={{
        classNames: {
          toast: "bg-dark-1 border-dark-1",
        },
      }}
    />
  );
};

export default ToastProvider;
