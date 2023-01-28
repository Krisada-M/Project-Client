import { Api, Auth } from "../api/coomon.api";
import type { AddBarberData, UpdateBarber, UpdateBooking } from "./admin.model";

export async function setStatus(status: boolean) {
  return await Api.post("set-status", {
    status: status,
  });
}

export function addBarber(token: string, data: AddBarberData) {
  return Auth(token).post("admin/barber-add", data);
}

export function editBarber(token: string, data: AddBarberData, id: number) {
  return Auth(token).post(`admin/barber-edit/${id}`, data);
}

export function getAllBarber(token: string) {
  return Auth(token).get("admin/barber-detail");
}

export function getBooking(token: string, status: string) {
  return Auth(token).get(`admin/booking-${status}`);
}

export function updateStatusBarber(
  token: string,
  { id, status }: UpdateBarber
) {
  return Auth(token).post("admin/barber-status", {
    barber_id: `${id}`,
    status: status ? "online" : "offline",
  });
}

export function updateStatusBooking(
  token: string,
  { bookingID, status, timeEnd }: UpdateBooking
) {
  return Auth(token).post("admin/booking-status", {
    service_id: `${bookingID}`,
    status: status,
    time_end: timeEnd,
  });
}

export function removeBarber(token: string, id: number) {
  return Auth(token).post(`admin/barber-delete/${id}`);
}

export function removeBooking(token: string, id: number) {
  return Auth(token).post(`admin/booking-remove/${id}`);
}
