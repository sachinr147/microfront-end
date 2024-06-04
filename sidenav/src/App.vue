<template>
  <div>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          class="bg-deep-purple custom-drawer"
          theme="dark"
          permanent
        >
          <v-list color="transparent">
            <v-list-item
              v-for="(link, index) in navLinks"
              :key="index"
              :prepend-icon="link.icon"
              :title="link.text"
              @click="navigateTo(link.path)"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn block @click="logout"> Logout </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
    <!-- <nav>
      <ul>
        <li><a href="/home" @click.prevent="navigateTo('/home')">Home</a></li>
        <li>
          <a href="/profile" @click.prevent="navigateTo('/profile')">Profile</a>
        </li>
        <li>
          <a href="/settings" @click.prevent="navigateTo('/settings')"
            >Settings</a
          >
        </li>
      </ul>
    </nav> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    selection: [],
    navLinks: [
      { icon: "mdi-view-dashboard", text: "Home", path: "/" },
      { icon: "mdi-account-box", text: "Profile", path: "/profile" },
      { icon: "mdi-gavel", text: "Settings", path: "/settings" },
    ],
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
  methods: {
    navigateTo(url) {
      window.history.pushState(null, null, url);
      window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
    },
    handleClick() {
      alert("Button clicked!");
    },
    logout() {
      localStorage.removeItem("token");
      window.onLogout();
      // Code to handle logout
      // This method should be implemented based on your application's logout mechanism
    },
  },
};
</script>

<style scoped>
.custom-drawer {
  height: 90vh !important ;
  position: relative !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
