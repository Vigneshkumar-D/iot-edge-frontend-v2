import axios from "axios";
import { USER_URL, getAuthHeader } from "../../../../../utils/constService";

export const fetchUser = () => {
  return axios.get(USER_URL, getAuthHeader());
};
export const postUser = (data) => {
  return axios.post(USER_URL, data, getAuthHeader());
};

export const putUser = (data, id) => {
  return axios.put(`${USER_URL}/${id}`, data, getAuthHeader());
};

export const deleteUser = (id)=>{
  return axios.delete(`${USER_URL}/${id}`,getAuthHeader())
}
