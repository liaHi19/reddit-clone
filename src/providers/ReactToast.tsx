import React from "react";
import { ToastContainer } from "react-toastify";

type ReactToastProps = {};

const ReactToast: React.FC<ReactToastProps> = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
export default ReactToast;
