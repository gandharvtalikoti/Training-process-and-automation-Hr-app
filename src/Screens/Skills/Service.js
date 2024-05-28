import axios from "axios";
import API from "../../Common";

export const createSkill = (data) => axios.post(`${API}/skill/`, data);

export const getAllSkills = (params) => axios.get(`${API}/skill/skills`,{params});

export const deleteSkill = (id) => axios.delete(`${API}/skill/${id}`);

export const fetchSkillById = (id) => axios.get(`${API}/skill/skillById/${id}`);

export const editSkill = (id, data) => axios.put(`${API}/skill/${id}`, data);