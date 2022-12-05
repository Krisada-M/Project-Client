import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

function Auth(token: string) {
  return axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function AuthCustom({ token }: { token: string }) {
  return axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
      "Content-type": "application/json",
      userToken: token,
    },
  });
}

export { Auth, Api, AuthCustom };

