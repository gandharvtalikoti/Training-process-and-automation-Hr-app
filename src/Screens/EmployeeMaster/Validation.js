import {
  DEPARTMENT,
  DURATION,
  EXPECTED_OUTPUT,
  FULL_NAME,
  SKILL_NAME,
  SUB_SKILL_NAME,
} from "./Constants";
export const validateTrainingField = (errors, name, value) => {
  delete errors[name];
  if (name === FULL_NAME && !value) {
    errors[name] = "Employee name is required";
  } else if (name === DEPARTMENT && !value) {
    errors[name] = "Employee department is required";
  } else if (name === SKILL_NAME && !value) {
    errors[name] = "Employee skill name is required";
  } else if (name === SUB_SKILL_NAME && !value) {
    errors[name] = "Employee sub skill name is required";
  } else if (name === DURATION && !value) {
    errors[name] = "Employee duration is required";
  } else if (name === EXPECTED_OUTPUT && !value) {
    errors[name] = "Expected output is required";
  }
  return errors;
};

export const validateTrainingSubmitField = (formData) => {
  const errors = {};
  if (!formData[FULL_NAME]) {
    errors[FULL_NAME] = "Full name is required";
  }

  if (!formData[DEPARTMENT]) {
    errors[DEPARTMENT] = "Employee department is required";
  }
  if (!formData[SKILL_NAME]) {
    errors[SKILL_NAME] = "Employee skill name is required";
  }
  if (!formData[SUB_SKILL_NAME]) {
    errors[SUB_SKILL_NAME] = "Employee sub skill name is required";
  }
  if (!formData[DURATION]) {
    errors[DURATION] = "Employee duration is required";
  }
  if (!formData[EXPECTED_OUTPUT]) {
    errors[EXPECTED_OUTPUT] = "Expected output is required";
  }
  return errors;
};
