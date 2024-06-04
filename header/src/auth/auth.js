// src/auth.js
export function checkAuth() {
  if (
    process.env.VUE_APP_ENV === "development" &&
    process.env.VUE_APP_MOCK_AUTH
  ) {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      localStorage.setItem("auth_token", process.env.VUE_APP_MOCK_TOKEN);
    }
    return true;
  }
  // Implement real auth check here for production
  // return checkRealAuth();
  return true;
}
