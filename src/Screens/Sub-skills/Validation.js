import { SKILL_NAME, SUB_SKILL_NAME } from "./Constants";
export const validateSubSkillField = (errors, name, value) => {
  delete errors[name];
  if (name === SKILL_NAME && !value) {
    errors[name] = "Skill name is required";
  } 
  if (name === SUB_SKILL_NAME && !value) {
    errors[name] = "Sub skill name is required";
  }
  return errors;
};

export const validateSubSkillSubmitFields = (formData) => {
  const errors = {};
  if (!formData[SKILL_NAME]) {
    errors[SKILL_NAME] = "Skill name is required";
  }
  if (!formData[SUB_SKILL_NAME]) {
    errors[SUB_SKILL_NAME] = "Sub skill name is required";
  }
  
  return errors;
};
