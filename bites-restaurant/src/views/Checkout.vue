<template>
  <div class="wrapper">
    {{ list }}
    <h1>Checkout</h1>
    <ul>
      <li v-for="food in list" :key="food.id">
        {{ food.title }} - {{ food.price }} - {{ food.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.getters.cartProducts;
    },
  },
};
</script>

<style>
</style>