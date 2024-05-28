import { USER_EMAIL, USER_PASSWORD, USER_ROLE } from "./Constants";
export const validateLoginField = (errors, name, value) => {
  delete errors[name];
  if (name === USER_EMAIL && !value) {
    errors[name] = "User name is required";
  } else if (name === USER_PASSWORD && !value) {
    errors[name] = "Password is required";
  } else if (name === USER_ROLE && !value) {
    errors[name] = "User role is required";
  }
  return errors;
};

export const validateLoginSubmitFields = (formData) => {
  const errors = {};
  if (!formData[USER_EMAIL]) {
    errors[USER_EMAIL] = "User name is required";
  }
  if (!formData[USER_PASSWORD]) {
    errors[USER_PASSWORD] = "Password is required";
  }
  if (!formData[USER_ROLE]) {
    errors[USER_ROLE] = "User role is required";
  }
  return errors;
};
