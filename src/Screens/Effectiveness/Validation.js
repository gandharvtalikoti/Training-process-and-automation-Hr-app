import { COMMENT, EFFECTIVENESS } from "./Constants";
export const validateCompetenceField = (errors, name, value) => {
  delete errors[name];
  if (name === COMMENT && !value) {
    errors[name] = "Score name is required";
  } else if (name === EFFECTIVENESS && !value) {
    errors[name] = "Effectiveness is required";
  }

  return errors;
};

export const validateCompetenceSubmitField = (formData) => {
  const errors = {};
  if (!formData[COMMENT]) {
    errors[COMMENT] = "Score  is required";
  }

  if (!formData[EFFECTIVENESS]) {
    errors[EFFECTIVENESS] = "Effectiveness  is required";
  }
  return errors;
};
