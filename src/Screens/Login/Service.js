import axios from "axios";
import API from "../../Common";


export const login = (data) => axios.post(`${API}/login/`, data);

export const checkLogin = () => axios.get(`https://infynow.com/api.php`);
