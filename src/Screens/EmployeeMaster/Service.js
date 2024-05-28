import axios from "axios";
import API from "../../Common";

export const getAllDepartments = (data) => axios.get(`${API}/department/departments`, data);

export const getAllEmployees = (params) => axios.get(`${API}/employee/employees`, {params});

export const deleteEmployee = (id) => axios.delete(`${API}/employee/${id}`);

export const addEmployeeTraining = (data) => axios.post(`${API}/employee/training`, data);