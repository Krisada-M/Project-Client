import { signinData, signupData, updateUserData } from "../types/user.type";
import { Api, Auth, AuthCustom } from "./coomon.api";

export function userLogin({ username, password }: signupData) {
  return Api.post("/login", {
    login_type: "username",
    username: username,
    password: password,
  });
}

export function userRegister({
  email,
  firstname,
  lastname,
  password,
  username,
}: signinData) {
  return Api.post("/register ", {
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: password,
    username: username,
    user_type: "USER",
  });
}

export function getProfile(token: string) {
  return Auth(token).get("/user/");
}

export function updateUserProfile(token: string, data: updateUserData) {
  return Auth(token).post("/user/update", {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    gender: data.gender,
  });
}

export function deleteUser(token: string) {
  return Auth(token).post("/user/cancel-subscription");
}

export function userChangePassword(
  token: string,
  password: { old_password: string; new_password: string }
) {
  return Auth(token).post("/user/change-password", {
    old_password: password.old_password,
    new_password: password.new_password,
  });
}

export function userForgotPassword(email: string) {
  return Api.post("/verify-account", {
    email: email,
  });
}

export function userCheckMail(email: string) {
  return Api.post("/check-email", {
    email: email,
  });
}

export function userVerifyOTP({
  ref_no,
  otp,
  user_id,
}: {
  ref_no: string;
  otp: string;
  user_id: string;
}) {
  return Api.post("/verify-otp", {
    user_id: user_id,
    otp: otp,
    ref_no: ref_no,
  });
}

export function userSetPassword(userToken: string, NewPassword: string) {
  return AuthCustom({ token: userToken }).post("/set-password", {
    password: NewPassword,
  });
}
