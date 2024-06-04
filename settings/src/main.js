import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Import MDI CSS

const vuetify = createVuetify({
  components,
  directives,
});

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App),
  },
  handleInstance: (app) => {
    app.use(vuetify);
  },
  domElementGetter: (props) =>
    props.domElement || document.getElementById("main-content"),
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

// if (process.env.NODE_ENV === "development") {
//   createApp(App).use(vuetify).mount("#app");
// }
