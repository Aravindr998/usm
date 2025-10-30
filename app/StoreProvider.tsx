"use client";
import store from "@/lib/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const StoreProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="bottom-right"
        theme="colored"
        closeOnClick
        draggable
        newestOnTop
      />
    </Provider>
  );
};

export default StoreProvider;
