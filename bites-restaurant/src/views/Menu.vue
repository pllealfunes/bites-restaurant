<template>
  <div class="wrapper">
    <h1>Menu</h1>
    <ul>
      <li v-for="food in foods" :key="food">{{ food }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return { food: null };
  },
  props: {},
  methods: {
    async readMenu() {
      const res = await fetch("http://localhost:3000/food");
      let data = await res.json();
      return data;
      //console.log(foods);
    },
  },
  async created() {
    const data = await this.readMenu();
    this.food = data;
    console.log(data);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>