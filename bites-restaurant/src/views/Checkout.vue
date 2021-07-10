<template>
  <div class="wrapper">
    <h1>Checkout</h1>
    <ul>
      <li v-for="food in list" :key="food.id">
        {{ food.title }} - {{ food.price }} - {{ food.quantity }}
      </li>
    </ul>
    <div>Total: {{ cartTotal }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.getters.cartProducts;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
};
</script>

<style>
</style>