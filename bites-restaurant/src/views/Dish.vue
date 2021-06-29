<template>
  <div v-if="food" class="wrapper">
    <h1>{{ food.title }}</h1>
    <div>{{ food.category }}</div>
    <p>{{ food.ingrediants }}</p>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      food: null,
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    fetch("http://localhost:3000/food/" + this.id)
      .then((res) => res.json())
      .then((data) => (this.food = data))
      .catch((err) => console.log(err.message));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>