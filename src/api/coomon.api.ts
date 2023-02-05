import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_API}/app-json/v1/`;
export const Bucket = import.meta.env.VITE_BUCKET_API;

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

function Auth(token: string) {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function AuthCustom({ token }: { token: string }) {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
      userToken: token,
    },
  });
}

export { Auth, Api, AuthCustom };

