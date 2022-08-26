import axios from "axios";

const api = axios.create({
	baseURL : `/api/todo/`
});

export default api;