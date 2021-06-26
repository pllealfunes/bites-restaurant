<template>
  <header>
    <h1>Bites</h1>
  </header>
  <div id="welcomeBox">
    <div>
      <h2>Bite Sized Goodness</h2>
      <button>Order</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
};
</script>
<style lang="scss">
body {
  background: url("../assets/images/burger1.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

header {
  opacity: 0.88;
  background-color: #343a40;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 70px;
    font-family: "Arvo", serif;
  }
}

#welcomeBox {
  opacity: 0.88;
  background-color: #343a40;
  color: #fff;
  width: 400px;
  height: 200px;
  color: #fff;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding: 1rem;
    h2 {
      font-size: 40px;
    }

    button {
      padding: 10px;
      border-radius: 25px;
      border: none;
      font-size: 20px;
      background-color: red;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>