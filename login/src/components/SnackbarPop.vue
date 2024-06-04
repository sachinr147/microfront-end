<template>
  <v-snackbar v-model="visible" :timeout="timeout" :color="color">
    {{ message }}
  </v-snackbar>
</template>

<script>
import emitter from "../event-bus.js";

export default {
  data() {
    return {
      visible: false,
      message: "",
      color: "success",
      timeout: 3000,
    };
  },
  created() {
    emitter.on("show-snackbar", this.showSnackbar);
  },
  methods: {
    showSnackbar({ message, color, timeout }) {
      this.message = message || "Default message";
      this.color = color || "success";
      this.timeout = timeout || 3000;
      this.visible = true;
    },
  },
  beforeUnmount() {
    emitter.off("show-snackbar", this.showSnackbar);
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
