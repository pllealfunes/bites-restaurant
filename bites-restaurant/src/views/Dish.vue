<template>
  <div v-if="food" id="wrapper">
    <header>
      <h1>{{ food.title }}</h1>
      <router-link v-bind:to="{ name: 'Checkout' }">
        <button id="cart">
          <i class="fas fa-shopping-cart"></i>
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
      <div id="price">${{ food.price }}</div>
    </div>
    <button id="addBtn" @click="addToCart(food)">Add to Order</button>
  </div>
</template>

<script>
export default {
  name: "Menu",
  components: {
    //cart,
  },
  data() {
    return {};
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
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.food);
      //this.$store.commit("setCartCount", cart.count());
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