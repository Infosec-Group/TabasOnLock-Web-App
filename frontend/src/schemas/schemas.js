import * as yup from "yup";

const PHONE_REGEX = /^(09\d{9}|(\+639|639)\d{9})$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&._]{8,}$/;

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

export const userSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Enter a valid email address").required("Valid email is required"),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, {
      message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    })
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm your password"),
  phone_number: yup
    .string()
    .matches(PHONE_REGEX, "Please enter a valid PH phone number")
    .required("Phone number is required"),
});