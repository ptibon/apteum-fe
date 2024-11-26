import axios from "axios";

//apply base url for axios
const API_URL = process.env.APP_API_BASE_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url: string, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url: string, data: unknown, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data)
    .catch((error) => console.log(error.response.data));
}
