<template>
  <header>
    <link
      rel="icon"
      type="image/png"
      href="data:image/png;base64,iVBORw0KGgo="
    />
  </header>
  <router-view />
</template>
<script>
//import store from "@/store/index.js";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    menu() {
      return this.$store.dispatch("getMenu");
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  mounted() {
    this.loadMenu();
  },
  methods: {
    loadMenu() {
      this.$store.dispatch("getMenu");
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: whitesmoke;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
