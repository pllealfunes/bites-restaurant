<template>
  <router-link v-bind:to="{ name: 'Checkout' }">
    <button id="cart">
      <i class="fas fa-shopping-cart"
        ><span>{{ cartItemTotal }}</span></i
      >
    </button>
  </router-link>
</template>

<script>
//import { cart } from "@/common/Cart.js";
export default {
  name: "Cart",
  data() {
    return {
      //cart: [],
    };
  },
  props: {},
  computed: {
    cartItemTotal() {
      return this.$store.getters.cartItemTotal;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#cart {
  border: none;
  font-size: 25px;
  background-color: whitesmoke;
  margin-left: 5px;
  cursor: pointer;
  span {
    margin-left: 5px;
  }
}
</style>