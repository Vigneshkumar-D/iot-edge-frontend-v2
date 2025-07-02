import {SHIFT_URL, getAuthHeader } from "../../../../../utils/constService";
import axios from "axios";

export const fetchShifts = () => axios.get(SHIFT_URL, getAuthHeader());
