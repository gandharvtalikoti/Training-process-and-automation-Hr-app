import axios from "axios";
import API from "../../Common";

export const getAllDepartments = (data) =>
  axios.get(`${API}/department/departments`, data);

export const getEmployeeTrainingData = (params) =>
  axios.get(`${API}/employee/employees-training-data`, { params });

export const addScore = (data, id) => axios.put(`${API}/employee/add-score/${id}`, data);
