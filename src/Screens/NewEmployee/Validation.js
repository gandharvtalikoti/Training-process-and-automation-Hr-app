import {
  FULL_NAME,
  EMAIL,
  PHONE,
  DESIGNATION,
  EXPERIENCE,
  GENDER,
  HEIGHT,
  PASSWORD,
  QULIFICATION,
  ROLE,
  WEIGHT,
  DEPARTMENT,
  ADDRESS,
} from "./Constants";
export const validateEmployeeField = (errors, name, value) => {
  delete errors[name];
  if (name === FULL_NAME && !value) {
    errors[name] = "Employee name is required";
  } else if (name === PHONE && !value) {
    errors[name] = "Employee phone is required";
  } else if (name === ADDRESS && !value) {
    errors[name] = "Employee department is required";
  } else if (name === DEPARTMENT && !value) {
    errors[name] = "Employee department is required";
  } else if (name === PASSWORD && !value) {
    errors[name] = "Employee password is required";
  } else if (name === EMAIL && !value) {
    errors[name] = "Employee email is required";
  }else if (name === ROLE && !value) {
    errors[name] = "Employee role is required";
  }
  return errors;
};

export const validateEmployeeSubmitFields = (formData) => {
  const errors = {};
  if (!formData[FULL_NAME]) {
    errors[FULL_NAME] = "Full name is required";
  }
  if (!formData[PHONE]) {
    errors[PHONE] = "Employee phone is required";
  }
  if (!formData[ADDRESS]) {
    errors[ADDRESS] = "Employee address is required";
  }
  if (!formData[DEPARTMENT]) {
    errors[DEPARTMENT] = "Employee department is required";
  }
  if (!formData[PASSWORD]) {
    errors[PASSWORD] = "Employee password is required";
  }
  if (!formData[EMAIL]) {
    errors[EMAIL] = "Employee email is required";
  }
  if (!formData[ROLE]) {
    errors[ROLE] = "Employee email is required";
  }
  return errors;
};
