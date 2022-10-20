import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("* Email must be valid")
    .required("* Email is required"),
  password: yup
    .string()
    .min(5, "* Min length is 6 characters")
    .max(16, "* Max length is 16 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{6,}$/,
      "*Field includes a letter, a number, a character"
    )
    .required("* Password is required"),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "* Min length is 2 characters")
    .required("* First Name is required"),
  lastName: yup
    .string()
    .min(2, "* Min length is 2 characters")
    .required("* Last Name is required"),
  email: yup
    .string()
    .email("* Email must be valid")
    .required("* Email is required"),
  password: yup
    .string()
    .min(5, "* Min length is 6 characters")
    .max(16, "* Max length is 16 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{6,}$/,
      "*Field includes a letter, a number, a character"
    )
    .required("* Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "* The passwords should matches")
    .required("* Confirm password is required"),
});

export const resetPassword = yup.object({
  email: yup
    .string()
    .email("* Email must be valid")
    .required("* Email is required"),
});
