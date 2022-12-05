import { Api } from "./coomon.api";

export const barberListAPI = () => {
  return Api.get("/barber/list");
};

export const barberProfile = (id: string) => {
  return Api.get(`barber/${id}`);
};

export const barberLiveSearch = ({
  keyword,
  gender,
}: {
  keyword: string;
  gender: string;
}) => {
  if (gender == "Select") {
    gender = "";
  }
  return Api.post("barber/search", {
    keyword: keyword,
    gender: gender,
    service: "",
  });
};
