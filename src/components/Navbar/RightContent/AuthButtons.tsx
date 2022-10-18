import React from "react";

import AuthButton from "./AuthButton";

const AuthButtons: React.FC = () => {
  return (
    <>
      <AuthButton
        variant="outline"

        // onClick={}
      >
        Log In
      </AuthButton>
      <AuthButton>Sign Up</AuthButton>
    </>
  );
};
export default AuthButtons;
