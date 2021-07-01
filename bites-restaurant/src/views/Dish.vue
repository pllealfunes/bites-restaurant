<template>
  <div v-if="food" class="wrapper">
    <h1>{{ food.title }}</h1>
    <div
      class="thumb"
      :style="{
        'background-image':
          'url(' + require('../assets/images/' + food.img) + ')',
      }"
    ></div>
    <p>{{ food.category }}</p>
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
    fetch("http://localhost:3000/menu/" + this.id)
      .then((res) => res.json())
      .then((data) => (this.food = data))
      .catch((err) => console.log(err.message));
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
.thumb {
  width: 400px;
  height: 400px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  text-align: center;
}
</style>