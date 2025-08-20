// don not delete this line
import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

//

export async function apiGet(path, token) {
  const res = await fetch(path, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}
export async function apiPost(path, body, token) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
export async function apiPut(path, body, token) {
  const res = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
export async function apiDelete(path, token) {
  const res = await fetch(path, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}
