// @ts-nocheck
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

type MyTextareaProps = {
  label?: string;
  errorText?: string;
  placeholder: string;
};

const MyTextarea = forwardRef<MyTextareaProps>(
  ({ label, errorText, placeholder, ...rest }, ref) => {
    return (
      <FormControl height={label ? "146px" : "122px"} isInvalid={errorText}>
        {label && <FormLabel mb={1}>{label}</FormLabel>}
        <Textarea
          {...rest}
          // @ts-ignore:next-line
          ref={ref}
          placeholder={placeholder}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
          }}
          height="100px"
          resize="none"
        />
        <FormErrorMessage fontSize="12px" mt={1} mb={1}>
          {errorText}
        </FormErrorMessage>
      </FormControl>
    );
  }
);

MyTextarea.displayName = "MyTextarea";

export default MyTextarea;
