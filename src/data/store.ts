import create from "zustand";
import { Api } from "../api/coomon.api";
import type {
  dataStore, openBarber, signupModal,
  titleStore,
  tokenStore
} from "../types/store.type";

export const useTokenStore = create<tokenStore>((set) => ({
  token: "",
  storeToken: (token: string) =>
    set((state) => ({
      ...state,
      token,
    })),
  type: "",
  storeType: (type: string) =>
    set((state) => ({
      ...state,
      type,
    })),
}));

export const useTitleStore = create<titleStore>((set) => ({
  title: "",
  storeTitle: (title: string) =>
    set((state) => ({
      ...state,
      title,
    })),
}));

export const useSignupModal = create<signupModal>((set) => ({
  open: false,
  storeOpen: (open: boolean) =>
    set((state) => ({
      ...state,
      open,
    })),
}));

export const useAdminOpen = create<openBarber>((set) => ({
  open: false,
  setOpen: (open: boolean) =>
    set((state) => ({
      ...state,
      open,
    })),
}));

export const useUserStore = create<dataStore>((set) => ({
  init: "",
  initAuth: {
    CreatedAt: "",
    Email: "",
    ID: 0,
    Name: "",
    Gender: "",
    UpdatedAt: "",
    UserType: "",
    Username: "",
  },
  errorAuth: "",
  Logout: () => {
    set({
      initAuth: {
        CreatedAt: "",
        Email: "",
        ID: 0,
        Name: "",
        Gender: "",
        UpdatedAt: "",
        UserType: "",
        Username: "",
      },
    });
  },

  storeInit: async (url: string) => {
    Api.get(url)
      .then((response) => {
        set({ init: response.data.success });
      })
      .catch((response) => {
        console.clear();
      });
  },

  storeInitAuth: (url: string, tokenAuth: string) => {
    Api.get(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenAuth}`,
      },
    })
      .then((response) => {
        set({ initAuth: response.data.Data.user_detail });
      })
      .catch((response) => {
        set({ errorAuth: response });
        console.clear();
      });
  },
}));
