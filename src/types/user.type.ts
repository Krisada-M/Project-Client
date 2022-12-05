export type loginData<S = string> = {
  username: S;
  password: S;
  remember: boolean;
};

export type signupData<S = string> = {
  username: S;
  password: S;
};

export type signinData<S = string> = {
  email: S;
  firstname: S;
  lastname: S;
  gender: S;
  password: S;
  username: S;
  user_type?: S;
};

export type updateUserData<S = string> = {
  firstname: S;
  lastname: S;
  email: S;
  gender: S;
};

export type resultUser<S = string, N = number> = {
  CreatedAt: S;
  Email: S;
  ID: N;
  Name: S;
  Gender: S;
  UpdatedAt: S;
  UserType: S;
  Username: S;
};

export type RespData = {
  Data: { accessToken: string };
};

export interface userProfile {
  Books: Book[];
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  gender: string;
  name: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  status: string;
}

export interface Book {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: any;
  status: any;
  date: any;
  time_start: any;
  time_end: any;
  service: string;
  barber_id: number;
  user_id: number;
}
