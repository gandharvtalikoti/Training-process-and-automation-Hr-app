import axios from "axios";
import API from "../../Common";

export const getAllDepartments = (data) => axios.get(`${API}/department/departments`, data);

export const createEmployee = (data) => axios.post(`${API}/employee`, data);

export const fetchEmployeeById = (id) => axios.get(`${API}/employee/employeeById/${id}`);

export const editEmployee = (id, data) => axios.put(`${API}/employee/${id}`, data);