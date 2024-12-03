import { validations } from "./validations";
import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  firstname: validations.requiredString("First Name" , 3 , 50),
  lastname: validations.requiredString("Last Name" , 3 , 150),
  email: validations.email(),
  password: validations.password(8, "Please choose a stronger password"),
  confirmPassword: validations.confirmPassword("Please confirm your password"),
});

export const signInValidationSchema = Yup.object({
  email: validations.email(),
  password: validations.password(),
});

export const resetPasswordSchema = Yup.object({
  password:validations.password(),
  confirmPassword: validations.confirmPassword(),
})

export const updateProfileSchema = Yup.object({
  firstname: validations.requiredString("First Name" , 3 , 50),
  lastname: validations.requiredString("Last Name" , 3 , 150),
})
