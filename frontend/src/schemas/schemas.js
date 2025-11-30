import * as yup from "yup";

const PHONE_REGEX = /^(09\d{9}|(\+639|639)\d{9})$/;

export const userInfoSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Valid email is required"),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Please enter a valid PH phone number")
    .required("Phone number is required")
})

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});