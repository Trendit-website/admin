import Icons from "@/components/Shared/Icons";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
          icon: <Icons type="cancel" />,
        },
        error: {
          style: {
            backgroundColor: "red",
            color: "#FFFFFF",
            width: "350px",
          },
        },
      }}
    />
  );
};
export default ToastProvider;
