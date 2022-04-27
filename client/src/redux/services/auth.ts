import axios from "axios";
import { UserData } from "../../types";

const API_HOST = process.env.API_HOST || "http://localhost:8000"
const API_URL = `${API_HOST}/api/users`;
const headers = {"Access-Control-Allow-Origin": "*"}

async function register(userData: UserData) {
  const response = await axios.post(`${API_URL}/register`, userData, { headers });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

async function login(userData: Pick<UserData, "email" | "password">) {
  const response = await axios.post(`${API_URL}/login`, userData, { headers });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

async function logout() {
  await localStorage.removeItem("user");
}

async function profile(token: string) {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${token}` } 
  });
  return response.data;
}

export const authService = {
  register,
  logout,
  login,
  profile
};
