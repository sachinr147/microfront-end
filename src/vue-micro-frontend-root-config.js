// import { registerApplication, start } from "single-spa";
// import {
//   constructApplications,
//   constructRoutes,
//   constructLayoutEngine,
// } from "single-spa-layout";
// import microfrontendLayout from "./microfrontend-layout.html";

// const routes = constructRoutes(microfrontendLayout);
// const applications = constructApplications({
//   routes,
//   loadApp({ name }) {
//     return System.import(name);
//   },
// });
// const layoutEngine = constructLayoutEngine({ routes, applications });

// applications.forEach(registerApplication);
// layoutEngine.activate();
// start();

import {
  registerApplication,
  start,
  navigateToUrl,
  unregisterApplication,
} from "single-spa";
// import { setupHttpInterceptor } from './http-interceptor';

// const isAuthenticated = () => {
//   // Implement your authentication logic here
//   return localStorage.getItem("authToken") !== null; // Example logic, replace with your actual logic
// };

// setupHttpInterceptor();

function isLoggedIn() {
  // Add your logic to check if the user is logged in
  // For example, you can check if a token exists in local storage
  return localStorage.getItem("token") !== null;
}

registerApplication({
  name: "@app/login",
  app: () => System.import("http://localhost:8008/js/app.js"),
  activeWhen: [() => !isLoggedIn()], // Always active
  customProps: {
    domElement: document.getElementById("login"),
  },
});

if (isLoggedIn()) {
  registerAuthenticatedApps();
}

function registerAuthenticatedApps() {
  registerApplication({
    name: "@app/sidenav",
    app: () => System.import("http://localhost:8007/js/app.js"),
    // activeWhen: [() => true && isLoggedIn()], // Always active
    activeWhen: [() => isLoggedIn()],
    customProps: {
      domElement: document.getElementById("sidenav"),
    },
  });

  registerApplication({
    name: "@app/main-header",
    app: () => System.import("http://localhost:8003/js/app.js"),
    // activeWhen: [() => true && isLoggedIn()], // Always active
    activeWhen: [() => isLoggedIn()],
    customProps: {
      domElement: document.getElementById("header"),
    },
  });

  registerApplication({
    name: "@app/home",
    app: () => System.import("http://localhost:8004/js/app.js"),
    // activeWhen: (location) => location.pathname === "/" && isAuthenticated(),
    activeWhen: (location) => location.pathname === "/",
    // activeWhen: ["/home"],

    customProps: {
      domElement: document.getElementById("main-content"),
    },
  });

  registerApplication({
    name: "@app/settings",
    app: () => System.import("http://localhost:8006/js/app.js"),
    activeWhen: ["/settings"], // Active when path is /main-content
    customProps: {
      domElement: document.getElementById("main-content"),
    },
  });

  registerApplication({
    name: "@app/profile",
    app: () => System.import("http://localhost:8005/js/app.js"),
    activeWhen: ["/profile"], // Active when path is /main-content
    customProps: {
      domElement: document.getElementById("main-content"),
    },
  });
}

function unregisterAuthenticatedApps() {
  unregisterApplication("@app/main-header");
  unregisterApplication("@app/sidenav");
  unregisterApplication("@app/home");
  unregisterApplication("@app/settings");
  unregisterApplication("@app/profile");
}

//when user logged in successfully
window.onLoginSuccess = function () {
  registerAuthenticatedApps();
  navigateToUrl("/");
  // setTimeout(function () {
  //   navigateToUrl("/"); // Trigger a reroute
  // }, 3000);
};

//when user logged out successfully
window.onLogout = function () {
  unregisterAuthenticatedApps();
  navigateToUrl("/login");
};

//showing loader based on user input
window.showLoader = function () {
  const loader = document.getElementById("svg-loader");
  loader.style.display = "flex";
};

//hiding loader based on user input
window.hideLoader = function () {
  const loader = document.getElementById("svg-loader");
  loader.style.display = "none";
};

// registerApplication({
//   name: "@app/home",
//   app: () => System.import("@vue-mf/main-content"),
//   activeWhen: ["/main-content"], // Active when path is /main-content
//   customProps: {
//     domElement: document.getElementById('main-content'),
//   },
// });

start();
