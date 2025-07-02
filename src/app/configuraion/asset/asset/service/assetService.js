import axios from "axios";
import { SHIFT_URL } from "../../../../../utils/constService";

export const fetchAsset = () => axios.get(SHIFT_URL);
