import * as yup from "yup";

export const postSchema = yup.object().shape(
  {
    title: yup
      .string()
      .required("* Title is a required field")
      .min(4, "* Min length is 4 characters")
      .max(40, "* Max length is 40 characters"),
    body: yup
      .string()
      .nullable()
      .notRequired()
      .when("body", {
        is: (value: any) => value?.length,
        then: yup
          .string()
          .min(5, "* Min length is 5 characters")
          .max(200, "* Max length is 400 characters"),
        otherwise: yup.string().notRequired(),
      }),
    image: yup.string().notRequired(),
  },
  [["body", "body"]]
);
