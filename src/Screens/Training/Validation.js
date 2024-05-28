import {
  DEPARTMENT,
  DURATION,
  FULL_NAME,
  SKILL_NAME,
  SUB_SKILL_NAME,
  START_DATE,
  END_DATE,
  START_TIME,
  END_TIME,
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
  }
  else if (name === START_DATE && !value) {
    errors[name] = "Start date is required";
  }
  else if (name === END_DATE && !value) {
    errors[name] = "End date is required";
  }
  else if (name === START_TIME && !value) {
    errors[name] = "Start time duration is required";
  }
  else if (name === END_TIME && !value) {
    errors[name] = "End time is required";
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
  if (!formData[START_DATE]) {
    errors[START_DATE] = "Start date is required";
  }
  if (!formData[END_DATE]) {
    errors[END_DATE] = "End date is required";
  }
  if (!formData[START_TIME]) {
    errors[START_TIME] = "Start time is required";
  }
  if (!formData[END_TIME]) {
    errors[END_TIME] = "End time is required";
  }
  return errors;
};
