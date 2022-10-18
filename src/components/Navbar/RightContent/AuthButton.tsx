import React, { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type AuthButtonProps = {
  // onClick
  children: ReactNode;
  variant?: "solid" | "outline" | "oauth";
};

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  variant = "solid",
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      height="28px"
      display={{ base: "none", sm: "flex" }}
      width={{ base: "70px", md: "110px" }}
      mr={2}
      {...rest}
    >
      {children}
    </Button>
  );
};
export default AuthButton;
