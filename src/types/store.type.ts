import { resultUser } from "./user.type";

export type tokenStore = {
  token: string;
  storeToken: (token: string) => void;
};

export type titleStore = {
  title: string;
  storeTitle: (title: string) => void;
};

export type dataStore = {
  init: string;
  initAuth: resultUser;
  errorAuth: string;
  Logout: () => void;
  storeInit: (url: string) => void;
  storeInitAuth: (url: string, tokenAuth: string) => void;
};
