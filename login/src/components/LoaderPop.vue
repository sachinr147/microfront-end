<template>
  <div v-if="isLoading" class="spinner-load">
    <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import emitter from "../event-bus.js";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    emitter.on("show-hide-loader", this.showLoader);
  },
  methods: {
    showLoader() {
      this.isLoading = !this.isLoading;
    },
  },
  beforeUnmount() {
    emitter.off("hide-loader", this.showLoader);
  },
};
</script>

<style scoped>
.spinner-load {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff78;
}

/* Add your custom styles here */
</style>
