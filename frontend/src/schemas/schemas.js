import * as yup from "yup";

const PHONE_REGEX = /^(09\d{9}|(\+639|639)\d{9})$/;

export const userInfoSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Valid email is required"),
  phoneNumber: yup
    .string()
    .matches(PHONE_REGEX, "Please enter a valid PH phone number")
    .required("Phone number is required")
});