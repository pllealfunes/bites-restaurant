<template>
  <div id="main">
    <header>
      <h1>Menu</h1>
      <router-link v-bind:to="{ name: 'Checkout' }">
        <button id="cart"><i d="cart" class="fas fa-shopping-cart"></i></button>
      </router-link>
    </header>
    <div id="nav">
      <button
        v-for="(category, index) in categories"
        v-bind:key="index"
        class="btnCategory"
        @click="toggleFood(category)"
        value="`${category}`"
      >
        {{ category }}
      </button>
    </div>
    <div id="menuContainer">
      <div v-for="(food, index) in filteredFood" v-bind:key="index">
        <router-link
          v-bind:to="{ name: 'Dish', params: { id: food.id } }"
          class="foodLink"
        >
          <div id="foodContainer">
            <div
              id="header"
              :style="{
                'background-image':
                  'url(' + require('../assets/images/' + food.img) + ')',
              }"
            ></div>
            <div id="footer">
              <h3>{{ food.title }}</h3>
              <div>{{ food.category }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
//import store from "@/store/index";
export default {
  name: "Menu",
  data() {
    return {
      categories: ["All", "Breakfast", "Lunch", "Dinner", "Dessert"],
      //foods: [],
      category: [],
    };
  },
  mounted() {
    /*fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => (this.foods = data))
      .catch((err) => console.log(err.message));*/
    this.$store.dispatch("getMenu");
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    },
    filteredFood() {
      if (this.category.length === 0) return this.menu;
      return this.menu.filter((food) => {
        return this.category.includes(food.category);
      });
    },
  },
  methods: {
    toggleFood(category) {
      if (category == "All") {
        this.category = [];
      } else {
        this.category = category;
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 50px;
  }
  #cart {
    border: none;
    font-size: 25px;
    background-color: #fff;
    margin-top: 10px;
    margin-left: 10px;
    cursor: pointer;
  }
}
#nav {
  .btnCategory {
    background-color: #343a40;
    font-weight: bold;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 10%;
    font-size: 20px;
    margin: 2px;
    cursor: pointer;
  }
}
#menuContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  flex-shrink: 0;
  min-width: 0;
  padding: 0;
  .foodLink {
    text-decoration: none;
    color: #fff;
    #foodContainer {
      width: 300px;
      background-color: #343a40;
      font-weight: bold;
      opacity: 0.88;
      margin: 1rem;
      #header {
        /*background: url("../assets/images/burger2.jpg") no-repeat center center;*/
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        height: 200px;
      }
      #footer {
        height: 70px;
        font-size: 20px;
      }
    }
  }
}
</style>