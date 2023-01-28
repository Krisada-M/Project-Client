import { AddBooking } from "../types/service.type";
import { Api } from "./coomon.api";

export const serviceListAPI = () => {
  return Api.get("service/list");
};

export const statusSalon = async () => {
  return await Api.get("status");
};

export const bookingServiceAPI = (detail: AddBooking) => {
  return Api.post("service/add-booking", detail);
};
