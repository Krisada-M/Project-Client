export type BarberDetail = {
  allday: string;
  bookinday: string;
  id: number;
  gender: string;
  name: string;
  service1: string;
  service2: string;
  service3: string;
  service4: any;
  status: string;
};

export type UpdateBooking = {
  bookingID: number;
  status: "pending" | "approve" | "closed" | "unapproved";
  timeEnd?: string;
};

export type UpdateBarber = {
  id: number;
  status: boolean;
};

export type BookingStatus = {
  ID: number;
  status: string;
  date: string;
  time_start: string;
  time_end: string;
  service: string;
  barber: string;
  user: string;
  uniqueness_of_hair: string;
  length_hair: string;
  hair_thickness: string;
};

export type AddBarberData<S = string> = {
  name: S;
  gender: S;
  status: S;
  service1: S;
  service2: S;
  service3: S;
  service4: S;
};
