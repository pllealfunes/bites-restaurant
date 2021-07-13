<template>
  <div v-if="food" id="wrapper">
    <header>
      <h1>{{ food.title }}</h1>
      <cart></cart>
    </header>
    <div
      class="thumb"
      :style="{
        'background-image':
          'url(' + require('../assets/images/' + food.img) + ')',
      }"
    ></div>
    <div id="descriptionContainer">
      <p id="ingrediants">{{ food.ingrediants }}</p>
      <p id="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sunt
        quos eum neque quam officiis adipisci error quis magni ad.
      </p>
      <div id="price">${{ food.price }}</div>
    </div>
    <div id="confirmation-message" v-if="showConfirmationMessage">
      Added to Cart
    </div>
    <button id="addBtn" @click="addToCart(food)">Add to Order</button>
  </div>
</template>

<script>
import cart from "@/components/CartCount.vue";
export default {
  name: "Menu",
  components: {
    cart,
  },
  data() {
    return {
      showConfirmationMessage: false,
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    food() {
      return this.$store.getters.getFoodById(this.id);
    },
    /*cartItemTotal() {
      let itemsTotal = 0;
      this.$store.getters.cartProducts.forEach(
        (item) => (itemsTotal += item.quantity)
      );
      return itemsTotal;
    },*/
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.food);
      this.showConfirmationMessage = true;
      setTimeout(() => (this.showConfirmationMessage = false), 2000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    h1 {
      font-size: 40px;
    }
  }
  .thumb {
    width: 550px;
    height: 320px;
    margin-top: 1rem;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  #descriptionContainer {
    #description {
      text-align: justify;
      width: 30rem;
      margin-top: 5px;
      font-size: 20px;
    }
    #price {
      font-size: 30px;
      margin-top: 50px;
    }
  }

  #confirmation-message {
    background-color: green;
    font-weight: bold;
    font-size: 20px;
    padding: 5px 15px;
    color: #fff;
  }

  #addBtn {
    border: none;
    border-radius: 25px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: red;
    color: #fff;
    cursor: pointer;
    margin: 10px;
  }
}
</style>