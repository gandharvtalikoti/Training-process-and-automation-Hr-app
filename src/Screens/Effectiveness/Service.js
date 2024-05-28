import axios from "axios";
import API from "../../Common";

export const getAllDepartments = (data) =>
  axios.get(`${API}/department/departments`, data);

export const getEmployeeEffectiveData = (params) =>
  axios.get(`${API}/employee/employees-effective-data`, { params });

export const addEffectiveness = (data, id) => axios.put(`${API}/employee/add-effectiveness/${id}`, data);
