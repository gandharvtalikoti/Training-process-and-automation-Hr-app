import { SKILL_NAME, DEPARTMENT } from "./Constants";
export const validateSkillField = (errors, name, value) => {
  delete errors[name];
  if (name === SKILL_NAME && !value) {
    errors[name] = "Skill name is required";
  } else if (name === DEPARTMENT && !value) {
    errors[name] = "Department is required";
  }
  return errors;
};

export const validateSkillSubmitFields = (formData) => {
  const errors = {};
  if (!formData[SKILL_NAME]) {
    errors[SKILL_NAME] = "Skill name is required";
  }

  if (!formData[DEPARTMENT]) {
    errors[DEPARTMENT] = "Department is required";
  }

  return errors;
};
