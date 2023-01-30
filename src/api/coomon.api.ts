import axios from "axios";

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API}`,
  headers: {
    "Content-type": "application/json",
  },
});

export const Bucket = import.meta.env.VITE_BUCKET_API;

function Auth(token: string) {
  return axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API}`,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function AuthCustom({ token }: { token: string }) {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: {
      "Content-type": "application/json",
      userToken: token,
    },
  });
}

export { Auth, Api, AuthCustom };

