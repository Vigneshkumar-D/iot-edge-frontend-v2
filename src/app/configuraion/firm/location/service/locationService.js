import axios from "axios";
import { getAuthHeader, LOCATION_URL } from "../../../../../utils/constService";

export const fetchLocations = () => {
  return axios.get(LOCATION_URL, getAuthHeader());
};
export const postLocation = (data) => {
  return axios.post(LOCATION_URL, data, getAuthHeader());
};

export const putLocation = (data, locationId) => {
  return axios.put(`${LOCATION_URL}/${locationId}`, data, getAuthHeader());
};

export const deleteLocation = (locationId)=>{
  return axios.delete(`${LOCATION_URL}/${locationId}`,getAuthHeader())
}
