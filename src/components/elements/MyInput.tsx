import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";

type MyInputProps = {
  label?: string;
  errorText?: string;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
};

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & MyInputProps;
interface IMyInput extends TypeInputPropsField {}

const MyInput = forwardRef<IMyInput>(
  (
    {
      label,
      type = "text",
      errorText,
      placeholder,
      leftIcon,
      rightIcon,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <FormControl height={label ? "86px" : "62px"} isInvalid={errorText}>
        {label && <FormLabel mb={1}>{label}</FormLabel>}
        <InputGroup>
          {leftIcon && (
            <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
          )}
          <Input
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            fontSize="10pt"
            bg="gray.50"
            transition="0.3s ease-in-out"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outlineWidth: "0px",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
          />
          {rightIcon && (
            <InputRightElement>
              <Button variant="ghost" onClick={onClick}>
                {rightIcon}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage fontSize="12px" mt={1} mb={1}>
          {errorText}
        </FormErrorMessage>
      </FormControl>
    );
  }
);
MyInput.displayName = "MyInput";

export default MyInput;
