import { alertMessage } from "../alertMessage";

export const validateFormSignUp = (form) => {
  if (form.username.trim() === "") {
    alertMessage("Username is required", "error");
    return false;
  }
  if (form.firstName.trim() === "") {
    alertMessage("First Name is required", "error");
    return false;
  }
  if (form.lastName.trim() === "") {
    alertMessage("Last Name is required", "error");
    return false;
  }
  if (form.password.trim() === "") {
    alertMessage("Password is required", "error");
    return false;
  }
  if (form.confirmPassword.trim() === "") {
    alertMessage("Confirm Password is required", "error");
    return false;
  }
  if (form.password !== form.confirmPassword) {
    alertMessage("Passsword and Confirm Password does not match", "error");
    return false;
  }
  return true;
};

export const validateFormSignIn = (form) => {
  if (form.username.trim() === "") {
    alertMessage("Username is required", "error");
    return false;
  }
  if (form.password.trim() === "") {
    alertMessage("Password is required", "error");
    return false;
  }
  return true;
};
