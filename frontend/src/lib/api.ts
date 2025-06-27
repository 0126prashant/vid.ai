import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const api = axios.create({ baseURL: API_URL });

export function setAuthToken(token: string | null) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export async function signup(username: string, password: string) {
  const res = await api.post("/auth/signup", { username, password });
  return res.data;
}
export async function login(username: string, password: string) {
  const res = await api.post("/auth/login", { username, password });
  return res.data;
}
export async function sendChat(token: string, message: string) {
  setAuthToken(token);
  const res = await api.post("/chat", { message });
  return res.data.reply as string;
}
export async function getHistory(token: string) {
  setAuthToken(token);
  const res = await api.get("/chat/history");
  return res.data;
}
