import * as Yup from "yup";

const requiredStringValidation = (
  name ="This Field",
  minLength = 1,
  maxLength = 255,
  message = "This field is required"
) => {
  return Yup.string()
    .min(minLength, `${name} Must be at least ${minLength} characters`)
    .max(maxLength, `${name} Must be less than ${maxLength} characters`)
    .required(message);
};

const emailValidation = () => {
  return Yup.string()
    .email("Invalid email format")
    .required("Email is required");
};

const passwordValidation = (minLength = 8) => {
  return Yup.string()
    .min(minLength, `Password must be at least ${minLength} characters`)
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required");
};

const confirmPasswordValidation = () => {
  return Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required");
};

export const validations = {
  requiredString: requiredStringValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
};
