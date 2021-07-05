<template>
  <div v-if="food" id="wrapper">
    <header>
      <h1>{{ food.title }}</h1>
      <router-link v-bind:to="{ name: 'Checkout' }">
        <button id="cart">
          <i class="fas fa-shopping-cart"></i><cart :cart="cart"></cart>
        </button>
      </router-link>
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
      <div id="price">$3.99</div>
    </div>
    <button id="addBtn" :click="addCart">Add to Order</button>
  </div>
</template>

<script>
import { cart } from "@/components/CartCount.vue";
export default {
  name: "Menu",
  components: {
    Cart,
  },
  data() {
    return {
      food: null,
      cart: 0,
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    fetch("http://localhost:3000/menu/" + this.id)
      .then((res) => res.json())
      .then((data) => (this.food = data))
      .catch((err) => console.log(err.message));

    this.$store.commit("cartCount", cart.count());
  },
  computed: {
    imgSrc() {
      try {
        return require("../assets/images/" + this.food.img + ".jpg");
      } catch (e) {
        return require("../assets/images/thatbites.jpg");
      }
    },
  },
  methods: {
    addCart() {
      cart.add(this.food.id);
      this.$store.commit("setCartCount", cart.count());
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
    #cart {
      border: none;
      font-size: 25px;
      background-color: #fff;
      margin-left: 10px;
      cursor: pointer;
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