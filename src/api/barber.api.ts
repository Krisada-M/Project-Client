import { Api } from "./coomon.api";

export const barberListAPI = () => {
  return Api.get("/barber/list");
};

export const barberProfile = (id: string, date: string) => {
  return Api.post(`barber/${id}`, {
    date: date,
  });
};

export const barberLiveSearch = ({
  keyword,
  service,
  gender,
}: {
  keyword: string;
  service: string;
  gender: string;
}) => {
  if (gender == "Select") {
    gender = "";
  }
  if (service == "Select") {
    service = "";
  }

  return Api.post("barber/search", {
    keyword: keyword,
    gender: gender,
    service: service,
  });
};
