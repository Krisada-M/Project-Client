import { BarberDetail } from "../admin/admin.model";
import { resultUser } from "./user.type";

export type tokenStore = {
  token: string;
  storeToken: (token: string) => void;
  type: string;
  storeType: (type: string) => void;
};

export type titleStore = {
  title: string;
  storeTitle: (title: string) => void;
};

export type signupModal = {
  open: boolean;
  storeOpen: (open: boolean) => void;
};

export type dataStore = {
  init: string;
  initAuth: resultUser;
  errorAuth: string;
  Logout: () => void;
  storeInit: (url: string) => void;
  storeInitAuth: (url: string, tokenAuth: string) => void;
};

export type openBarber = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type UpdateBarber = {
  dataUser: BarberDetail;
  setDataUser: (dataUser: BarberDetail) => void;
};
