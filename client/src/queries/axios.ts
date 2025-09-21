import axios from "axios";
import config from "@config/index";

const instance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
