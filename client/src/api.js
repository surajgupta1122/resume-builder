import { API_URL } from "./config";

export async function authFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const url = path.startsWith("http") ? path.replace(/^https?:\/\/[^/]+/, API_URL) : `${API_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  return res;
}