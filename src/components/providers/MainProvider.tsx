import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import store from "../../store";
import ReactToast from "./ReactToast";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactToast />
      {children}
    </Provider>
  );
};
export default MainProvider;
