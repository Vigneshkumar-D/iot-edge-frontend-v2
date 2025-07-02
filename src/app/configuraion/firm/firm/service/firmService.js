import axios from "axios";
import { FIRM_URL, getAuthHeader } from "../../../../../utils/constService";

export const fetchFirm = () => {
  return axios.get(FIRM_URL, getAuthHeader());
};
export const postFirm = (data) => {
  return axios.post(FIRM_URL, data, getAuthHeader());
};

export const putFirm = (data, firmId) => {
  return axios.put(`${FIRM_URL}/${firmId}`, data, getAuthHeader());
};

export const deleteFirm = (firmId)=>{
  return axios.delete(`${FIRM_URL}/${firmId}`,getAuthHeader())
}
