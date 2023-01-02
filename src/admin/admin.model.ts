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
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: any;
  status: string;
  date: string;
  time_start: string;
  time_end: string;
  service: string;
  barber_id: number;
  user_id: number;
};
