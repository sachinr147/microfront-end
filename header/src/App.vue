<template>
  <v-card class="mx-auto">
    <v-toolbar
      :color="selection.length ? 'grey darken-4' : 'deep-purple accent-4'"
      dark
    >
      <v-app-bar-nav-icon v-if="!selection.length"></v-app-bar-nav-icon>
      <v-btn v-else icon @click="selection = []">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-toolbar-title>
        {{ selection.length ? `${selection.length} selected` : "Photos" }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-scale-transition>
        <v-btn v-if="selection.length" key="export" icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
      </v-scale-transition>
      <v-scale-transition>
        <v-btn v-if="selection.length" key="delete" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  // components: {
  //   HelloWorld,
  // },
  data: () => ({
    selection: [],
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
};
</script>

<style>
.v-toolbar__content {
  height: 10vh !important;
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
