<template>
  <div class="h-100 bg-purple-darken-2 d-flex justify-center align-center">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="username"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will
          be temporarily locked for three hours. If you must login now, you can
          also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        @click="login"
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
    <Snackbar />
    <Loader />
  </div>
</template>
<script>
import Snackbar from "./components/Snackbar.vue";
import Loader from "./components/Loader.vue";
import emitter from "./event-bus.js";

export default {
  name: "app",
  components: {
    Snackbar,
    Loader,
  },
  data: () => ({
    visible: false,
    username: "",
    password: "",
  }),
  methods: {
    login() {
      // Replace with your actual authentication logic
      if (
        this.username === "sachinr147@gmail.com" &&
        this.password === "password123"
      ) {
        if (typeof window.showSnackbar === "function") {
          window.showLoader(); // Call the global showSnackbar function if available
        } else {
          emitter.emit("show-hide-loader");
        }

        setTimeout(function () {
          emitter.emit("show-hide-loader");
          // On successful login:
          localStorage.setItem("token", "true");

          // window.history.pushState(null, null, "/home");
          // window.dispatchEvent(new PopStateEvent("popstate", { state: null }));

          if (typeof window.showSnackbar === "function") {
            // window.showLoader(); // Call the global showSnackbar function if available
          } else {
            emitter.emit("show-snackbar", {
              message: "Login successful!",
              color: "success",
              timeout: 3000,
            });
          }

          if (typeof window.onLoginSuccess === "function") {
            window.onLoginSuccess();
          }
        }, 4000);
      } else {
        alert("Invalid credentials");
      }
    },
  },
};
</script>

<style></style>
