// http-interceptor.js
export function setupHttpInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async function (input, init) {
    // Add authentication token to headers
    if (isLoggedIn()) {
      init = init || {};
      init.headers = init.headers || {};
      init.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }

    try {
      const response = await originalFetch(input, init);

      if (response.status === 401) {
        // Handle unauthorized responses
        window.onLogout();
      }

      return response;
    } catch (error) {
      // Handle global fetch errors
      console.error("Fetch error:", error);
      throw error;
    }
  };
}

function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}
