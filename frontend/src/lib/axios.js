import axios from 'axios';

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,  // send cookies with requests
})