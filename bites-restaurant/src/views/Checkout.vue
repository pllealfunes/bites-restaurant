<template>
  <div class="wrapper">
    <h1>Checkout</h1>
    <ul>
      <li v-for="food in list" :key="food.id">
        {{ food.title }} - {{ food.price }} - {{ food.quantity }}
        <button @click="incrementDish(food.id)">Add</button>
        <button @click="decrementDish(food)">Delete</button>
      </li>
    </ul>
    <div>Total: ${{ cartTotal }}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    list() {
      return this.$store.getters.cartProducts;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
  methods: {
    decrementDish(food) {
      console.log(this.$store.dispatch("deleteFromCart", food));
    },
    incrementDish(food) {
      this.$store.dispatch("addFromCart", food);
    },
  },
};
</script>

<style>
</style>