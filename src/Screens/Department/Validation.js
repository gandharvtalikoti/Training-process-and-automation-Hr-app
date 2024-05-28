import { DEPARTMENT_NAME, DEPARTMENT_CODE } from "./Constants";
export const validateDepartmentField = (errors, name, value) => {
  delete errors[name];
  if (name === DEPARTMENT_NAME && !value) {
    errors[name] = "Deparment name is required";
  } else if (name === DEPARTMENT_CODE && !value) {
    errors[name] = "Department code is required";
  } 
  return errors;
};

export const validateDepartmentSubmitFields = (formData) => {
  const errors = {};
  if (!formData[DEPARTMENT_NAME]) {
    errors[DEPARTMENT_NAME] = "Deparment name is required";
  }
  if (!formData[DEPARTMENT_CODE]) {
    errors[DEPARTMENT_CODE] = "Department code is required";
  }
  return errors;
};
