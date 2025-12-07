function buildUrlWithParams(url, params) {
  if (!params) return url;
  
  const filtered = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

  const queryString = new URLSearchParams(filtered).toString();
  return queryString ? `${url}?${queryString}` : url;
}

async function request(url, options = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    params,
    auth = true
  } = options;

  const token = localStorage.getItem("access_token");
  const authHeader = auth && token ? { Authorization: `Bearer ${token}` } : {};

  const fullUrl = buildUrlWithParams(`${import.meta.env.VITE_API_URL}${url}`, params);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeader,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get: (url, options) => request(url, { ...options, method: "GET" }),
  post: (url, body, options) => request(url, { ...options, method: "POST", body }),
  put: (url, body, options) => request(url, { ...options, method: "PUT", body }),
  patch: (url, body, options) => request(url, { ...options, method: "PATCH", body }),
  delete: (url, options) => request(url, { ...options, method: "DELETE" }),
};