import axios from "axios";
import API from "../../Common";

export const getDashboardData = (data) => axios.get(`${API}/employee/dashboard`, data);