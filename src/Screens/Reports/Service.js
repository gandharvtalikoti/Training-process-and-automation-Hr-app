import axios from "axios";
import API from "../../Common";

export const getAllDepartments = (data) =>
  axios.get(`${API}/department/departments`, data);

export const getEmployeeReportData = (params) =>
  axios.get(`${API}/employee/employees-report-data`, { params });

export const getEmployeeReportDataById = (id) =>
  axios.get(`${API}/employee/employees-report-data-by-id/${id}`);
