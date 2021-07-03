<template>
  <div v-if="food" id="wrapper">
    <h1>{{ food.title }}</h1>
    <div
      class="thumb"
      :style="{
        'background-image':
          'url(' + require('../assets/images/' + food.img) + ')',
      }"
    ></div>
    <div id="descriptionContainer">
      <p id="category">{{ food.category }}</p>
      <p id="ingrediants">{{ food.ingrediants }}</p>
      <p id="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        earum itaque dolores, voluptas modi, repellat, error libero voluptatem
        reiciendis sunt perspiciatis corporis veritatis architecto aliquid magni
        odio vero quas delectus pariatur explicabo est! Dignissimos voluptatem,
        laudantium incidunt aliquam, repellendus ipsam dolores animi tempora
        recusandae nesciunt ex nam reiciendis mollitia. Dignissimos.
      </p>
      <div id="price">$3.99</div>
    </div>
    <button id="addBtn">Add to Order</button>
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
  .thumb {
    width: 550px;
    height: 400px;
    margin-top: 1rem;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  #descriptionContainer {
    #description {
      text-align: justify;
      width: 50rem;
      height: 10rem;
      padding: 5px;
      margin-top: 5px;
      font-size: 20px;
    }
    #price {
      font-size: 25px;
      margin-bottom: 10px;
    }
  }

  button {
    border: none;
    border-radius: 25px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: red;
    color: #fff;
    cursor: pointer;
  }
}
</style>