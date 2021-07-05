<template>
  <div class="wrapper">
    <router-link id="list-count" v-bind:to="{ name: 'Checkout' }">
      {{ cartCount }}</router-link
    >
  </div>
</template>

<script>
import { cart } from "@/common/Cart.js";
export default {
  name: "Cart",
  data() {
    return {
      cart: [],
    };
  },
  props: {},
  mounted() {
    this.$store.commit("cartCount", cart.count());
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>