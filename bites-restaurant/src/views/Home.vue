<template>
  <div id="wrapper">
    <header>
      <h1>Bites Restaurant</h1>
    </header>
    <div id="welcomeBox">
      <div id="welcome">
        <h2>Bite Sized Goodness</h2>
        <router-link to="/menu"><button>Order</button></router-link>
      </div>
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
<style scoped lang="scss">
$background-grey: #343a40;
$font-white: #fff;

header {
  opacity: 0.88;
  background-color: black;
  color: $font-white;
  h1 {
    font-size: 55px;
    font-family: "Arvo", serif;
    text-align: center;
  }
}

#wrapper {
  opacity: 0.88;
  background: url("../assets/images/burger1.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  overflow: hidden;

  #welcomeBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;

    div {
      opacity: 0.88;
      background-color: $background-grey;
      color: $font-white;
      max-width: 350px;
      height: 300px;
      width: 100%;
      padding: 1rem;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h2 {
        font-size: 45px;
      }

      button {
        padding: 10px;
        border-radius: 25px;
        border: none;
        font-size: 30px;
        background-color: red;
        color: $font-white;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}

@media screen {
}
</style>