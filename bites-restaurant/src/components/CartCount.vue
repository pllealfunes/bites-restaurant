<template>
  <div class="wrapper">
    <router-link id="list-count" v-bind:to="{ name: 'Checkout' }">
      {{ cart.length }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      cart: 0,
    };
  },
  props: {},
  computed: {
    cartCount() {
      return this.cart++;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>