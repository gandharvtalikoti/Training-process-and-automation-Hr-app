import { SCORE } from "./Constants";
export const validateCompetenceField = (errors, name, value) => {
  delete errors[name];
  if (name === SCORE && !value) {
    errors[name] = "Score name is required";
  }
  return errors;
};

export const validateCompetenceSubmitField = (formData) => {
  const errors = {};
  if (!formData[SCORE]) {
    errors[SCORE] = "Score  is required";
  }
  return errors;
};
