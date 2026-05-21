import { api } from './client.js';

/** Login with email + password → POST /api/users/authentication/ */
export async function login(email, password) {
  const data = await api.post('/users/authentication/', { email, password });
  const token = data.token ?? data.access;
  if (token) {
    localStorage.setItem('cf_token', token);
    if (data.refresh) localStorage.setItem('cf_refresh', data.refresh);
  }
  return data;
}

/** Register a new account → POST /api/users/create-user/ */
export async function register(email, password, firstName, lastName) {
  const data = await api.post('/users/create-user/', {
    email,
    password,
    first_name: firstName,
    last_name:  lastName,
  });
  const token = data.token ?? data.access;
  if (token) localStorage.setItem('cf_token', token);
  return data;
}

/** Fetch the authenticated user profile → GET /api/users/profile/ */
export function getUser() {
  return api.get('/users/profile/');
}

/** Refresh JWT access token → POST /api/users/refresh/ */
export async function refreshToken() {
  const refresh = localStorage.getItem('cf_refresh');
  if (!refresh) throw new Error('No refresh token stored');
  const data = await api.post('/users/refresh/', { refresh });
  if (data.access) localStorage.setItem('cf_token', data.access);
  return data;
}

/** Remove stored tokens. */
export function logout() {
  localStorage.removeItem('cf_token');
  localStorage.removeItem('cf_refresh');
}

/** Returns true if a token is stored locally. */
export function isAuthenticated() {
  return Boolean(localStorage.getItem('cf_token'));
}
