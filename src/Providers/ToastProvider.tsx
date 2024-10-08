import Icons from "../components/Shared/Icons";
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
          icon: <Icons type="mark" />,
        },
        error: {
          style: {
            backgroundColor: "red",
            color: "#FFFFFF",
            width: "350px",
          },
        },
        icon: <Icons type="cancel" />,
      }}
    />
  );
};
export default ToastProvider;
