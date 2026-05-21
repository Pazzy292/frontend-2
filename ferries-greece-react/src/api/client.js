const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

function getToken() {
  return localStorage.getItem('cf_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Token ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 204) return null;

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      json?.detail ??
      (Array.isArray(json?.non_field_errors) ? json.non_field_errors[0] : null) ??
      res.statusText;
    const err = new Error(message);
    err.status = res.status;
    err.data = json;
    throw err;
  }

  return json;
}

export const api = {
  get:    (path)       => request(path),
  post:   (path, body) => request(path, { method: 'POST',  body: JSON.stringify(body) }),
  put:    (path, body) => request(path, { method: 'PUT',   body: JSON.stringify(body) }),
  patch:  (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path)       => request(path, { method: 'DELETE' }),
};
