export function login(token) {
  window.localStorage.setItem('token', token);
  window.location.reload();
}

export function isLoggedIn() {
  const token = window.localStorage.getItem('token');
  return token;
}

export function logout() {
  window.localStorage.removeItem('token');
  window.location.reload();
}