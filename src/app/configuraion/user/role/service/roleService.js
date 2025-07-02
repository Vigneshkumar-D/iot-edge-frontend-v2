import { ROLE_URL, getAuthHeader } from "../../../../../utils/constService";
import axios from "axios";

export const fetchRole = () => {
  return axios.get(ROLE_URL, getAuthHeader());
};
export const postRole = (data) => {
  return axios.post(ROLE_URL, data, getAuthHeader());
};

export const putRole = (data, id) => {
  return axios.put(`${ROLE_URL}/${id}`, data, getAuthHeader());
};

export const deleteRole = (id)=>{
  return axios.delete(`${ROLE_URL}/${id}`,getAuthHeader())
}
