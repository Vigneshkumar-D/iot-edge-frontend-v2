import axios from "axios";
import {
  LOGIN_URL,
  LOGOUT_URL,
  CURRENT_USER_URL,
  getAuthHeader,
  FORGET_PASSWORD_URL,
} from "./constService";

export const postLogin = (data) => {
  return axios.post(LOGIN_URL, data);
};

export const logout = (data) => {
  return axios.post(LOGOUT_URL, data, getAuthHeader());
};

export const getCurrentUser = () => {
  return axios.get(CURRENT_USER_URL, getAuthHeader());
};

export const postForgetPassword = (data) => {
  return axios.post(FORGET_PASSWORD_URL, data);
};