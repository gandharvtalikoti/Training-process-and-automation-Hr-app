import axios from "axios";
import API from "../../Common";

export const createSubSkill = (data) => axios.post(`${API}/subSkill/`, data);

export const getAllSkills = () => axios.get(`${API}/skill/skills`);

export const getAllSubSKills = (params) => axios.get(`${API}/subSkill/subSkills`,{params});

export const deleteSubSKill = (id) => axios.delete(`${API}/subSkill/${id}`);

export const fetchSubSkillById = (id) => axios.get(`${API}/subSkill/skillById/${id}`);

export const updateSubSkill = (id, data) => axios.put(`${API}/subSkill/${id}`, data);