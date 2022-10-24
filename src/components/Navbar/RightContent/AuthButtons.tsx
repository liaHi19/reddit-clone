import React from "react";

import { useActions } from "../../../hooks/useActions";

import AuthButton from "./AuthButton";

const AuthButtons: React.FC = () => {
  const { handleAuthView } = useActions();

  return (
    <>
      <AuthButton
        variant="outline"
        onClick={() => {
          handleAuthView("login");
        }}
      >
        Log In
      </AuthButton>
      <AuthButton
        onClick={() => {
          handleAuthView("signup");
        }}
      >
        Sign Up
      </AuthButton>
    </>
  );
};
export default AuthButtons;
