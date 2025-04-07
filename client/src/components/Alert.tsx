import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the Alert function
export default function Alert(status: string, message: string) {
    const options = {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };

    switch (status) {
        case "success":
            return toast.success(message, options);
        case "error":
            return toast.error(message, options);
        case "info":
            return toast.info(message, options);
        case "warning":
            return toast.warning(message, options);
        default:
            return toast(message, options);
    }
}

// Export the ToastContainer for global usage
export { ToastContainer } from "react-toastify";