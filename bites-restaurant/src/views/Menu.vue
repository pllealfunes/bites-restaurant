<template>
  <div class="wrapper">
    <h1>Menu</h1>
    <div id="wrapper">
      <div v-for="food in foods" v-bind:key="food.id">
        <h2>{{ category }}</h2>
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
export default {
  name: "Menu",
  data() {
    return {
      categories: [],
      foods: [],
      styleObject: {
        backgroundSize: "cover",
        height: "200px",
      },
      category: "",
    };
  },
  props: {},
  mounted() {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => (this.categories = data))
      .catch((err) => console.log(err.message));

    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then(
        (data) =>
          (this.foods = data.filter((food) =>
            food.category.match(food.category)
          ))
      )
      .catch((err) => console.log(err.message));
    //},
  },
  computed: {
    filteredFood() {
      return this.foods.filter((food) => {
        return food.category.match(this.category);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#wrapper {
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