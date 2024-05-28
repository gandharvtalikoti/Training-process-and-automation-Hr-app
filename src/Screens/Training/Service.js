import axios from "axios";
import API from "../../Common";


export const getAllTrainings = (params) => axios.get(`${API}/employee/trainings`, {params});


export const changeEmployeeStatus = (data, id) => axios.put(`${API}/employee/status-change/${id}`, data);




export const getAllDepartments = (data) => axios.get(`${API}/department/departments`, data);

export const getAllEmployees = (data) => axios.get(`${API}/employee/employees`, data);

export const deleteEmployee = (id) => axios.delete(`${API}/employee/${id}`);

export const scheduleEmployeeTraining = (data, id) => axios.put(`${API}/employee/schedule-training/${id}`, data);