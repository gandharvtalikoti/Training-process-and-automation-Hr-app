import axios from "axios";
import API from "../../Common";

export const createDepartment = (data) => axios.post(`${API}/department/`, data);

export const getAllDepartments = (params) => axios.get(`${API}/department/departments`, {params});

export const deleteDepartment = (id) => axios.delete(`${API}/department/${id}`);

export const fetchDepartmentById = (id) => axios.get(`${API}/department/departmentById/${id}`);

export const editDepartment = (id, data) => axios.put(`${API}/department/${id}`, data);
