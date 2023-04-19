import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    
  },
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};
export const post = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response;
};
export const remove = async (path, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response;
};
export const put = async (path, options = {}) => {
  const response = await httpRequest.put(path, options);
  return response;
};
export default httpRequest;
