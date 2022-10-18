import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState, IView } from "../../../atoms/authModalAtom";

import AuthButton from "./AuthButton";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const showAuthModal = (view: IView) => {
    setAuthModalState({ open: true, view });
  };
  return (
    <>
      <AuthButton
        variant="outline"
        onClick={() => {
          showAuthModal("login");
        }}
      >
        Log In
      </AuthButton>
      <AuthButton
        onClick={() => {
          showAuthModal("signup");
        }}
      >
        Sign Up
      </AuthButton>
    </>
  );
};
export default AuthButtons;
