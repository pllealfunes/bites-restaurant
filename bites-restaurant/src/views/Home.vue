<template>
  <header>
    <h1>Bites</h1>
  </header>
  <div id="welcomeBox">
    <div id="welcomeContent">
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

  h1 {
    font-size: 70px;
    letter-spacing: 1rem;
  }
}

#welcomeBox {
  opacity: 0.88;
  background-color: #343a40;
  color: #fff;
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  div {
    border: 1px orange solid;

    h2 {
      font-size: 40px;
      margin: 1rem;
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