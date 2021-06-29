<template>
  <div class="wrapper">
    <h1>Menu</h1>
    <div id="wrapper">
      <router-link
        v-for="food in foods"
        v-bind:to="{ name: 'Dish', params: { id: food.id } }"
        v-bind:key="food.id"
      >
        <div id="foodContainer">
          <h3>{{ food.title }}</h3>
          <div>{{ food.category }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return { foods: [] };
  },
  props: {},
  mounted() {
    fetch("http://localhost:3000/food")
      .then((res) => res.json())
      .then((data) => (this.foods = data))
      .catch((err) => console.log(err.message));
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
  margin-top: 5rem;
  #foodContainer {
    border: 1px red solid;
    padding: 5rem;
  }
}
</style>