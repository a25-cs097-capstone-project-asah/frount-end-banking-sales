import { api } from "./client";

export async function login(username, password) {
  const res = await api.post("/authentications", {
    username,
    password,
  });

  const { accessToken, refreshToken } = res.data.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return res.data;
}
