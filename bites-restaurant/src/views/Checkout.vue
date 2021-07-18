<template>
  <div id="wrapper">
    <h1>Checkout</h1>
    <div v-if="showConfirmationMessage">
      <h3>Thank You {{ fname }} {{ lname }}!</h3>
      <p>A confirmation email was sent to {{ email }}</p>
      <p v-if="instoreMessage">
        Your order will be ready for pickup in 30 minutes
      </p>
      <p v-if="deliveryMessage">Your order is on it's way!</p>
    </div>
    <div id="checkout">
      <form id="checkoutForm">
        <label>First Name</label>
        <input type="text" v-model="fname" />
        <label>Last Name</label>
        <input type="text" v-model="lname" />
        <label>Email:</label>
        <input type="email" v-model="email" />
        <label for="orderType">Order Type</label>
        <select name="orderType" v-model="orderType" @change="showAddressInput">
          <option value="onlineOrder">Online Order</option>
          <option value="pickup">Pickup</option>
        </select>
        <div v-if="onlineOrderSelect" id="onlineOrderSelect">
          <label>Address</label>
          <input type="text" required v-model="address" />
          <label>Town</label>
          <input type="text" required v-model="town" />
          <label>Zip Code</label>
          <input type="text" required v-model="zipCode" />
        </div>
        <label for="payment">Payment Method</label>
        <select name="payment" v-model="payment" @change="showCardOption">
          <option value="card">Card</option>
          <option value="instore">In store</option>
        </select>
        <div v-if="cardOption" id="cardOption">
          <label>Card</label>
          <input type="text" required v-model="cardNumber" />
          <label>Security Code</label>
          <input type="text" required v-model="secCode" />
        </div>
        <button
          id="cartButton"
          :disabled="formFilled"
          :class="{ disabledButton: formFilled }"
        >
          Checkout
        </button>
      </form>
      <div id="orderContainer">
        <ul id="cart">
          <li v-for="food in list" :key="food.id">
            {{ food.quantity }} - {{ food.title }} - ${{ food.price }}
            <button @click="incrementDish(food.id)" id="incrementBtn">
              <i class="fas fa-plus-square"></i>
            </button>
            <button @click="decrementDish(food)" id="decrementBtn">
              <i class="fas fa-minus-square"></i>
            </button>
          </li>
        </ul>
        <div>Total: ${{ cartTotal }}</div>
      </div>
    </div>
    <ul id="account-errors" v-if="errors">
      <li v-for="(error, index) in errors" :key="index">
        {{ error.toString() }}
      </li>
    </ul>
  </div>
</template>

<script>
//import Validator from "validatorjs";
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      payment: "",
      cardOption: false,
      cardNumber: "",
      secCode: "",
      onlineOrderSelect: false,
      orderType: false,
      address: "",
      town: "",
      zipCode: "",
      showConfirmationMessage: false,
      instoreMessage: false,
      deliveryMessage: false,
      errors: null,
      //formFilled: false,
    };
  },
  computed: {
    list() {
      return this.$store.getters.cartProducts;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
    formFilled() {
      if (
        this.fname.length > 1 &&
        this.lname.length > 1 &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.email
        )
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    decrementDish(food) {
      console.log(this.$store.dispatch("deleteFromCart", food));
    },
    incrementDish(food) {
      this.$store.dispatch("addFromCart", food);
    },
    showCardOption() {
      if (this.payment == "card") {
        this.cardOption = true;
      } else {
        this.cardOption = false;
      }
    },
    showAddressInput() {
      if (this.orderType == "onlineOrder") {
        this.onlineOrderSelect = true;
        this.deliveryMessage = true;
      } else {
        this.onlineOrderSelect = false;
        this.deliveryMessage = true;
      }
    },
    /*checkout() {
      this.fname = "";
      this.lname = "";
      this.email = null;
      this.payment = "";
      this.cardOption = false;
      this.cardNumber = "";
      this.secCode = "";
      this.cardOption = false;
      this.onlineOrderSelect = false;
      this.showConfirmationMessage = true;
    },*/
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  background-color: whitesmoke;
  min-height: 100vh;
}
#checkout {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
}

#checkoutForm,
#cardOption,
#onlineOrderSelect {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2rem;
}

#checkoutForm,
#orderContainer {
  margin: 2rem;
  font-size: 25px;
  font-weight: bold;
  background-color: #fff;
  min-width: 30rem;
}

#cart {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 2rem;
}
li {
  margin: 0.5rem;
}

input[type="text"],
input[type="email"] {
  background: transparent;
  border: none;
  border-bottom: 1px solid #343a40;
  font-size: 17px;
  height: 40px;
  margin-bottom: 45px;
  width: 400px;
}

select {
  margin: 10px;
  font-size: 20px;
}

#cartButton {
  background-color: tomato;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  padding: 5px;
  border: none;
  margin-top: 2rem;
}

.disabledButton {
  cursor: not-allowed;
  background-color: #c8c8c8;
}

#incrementBtn,
#decrementBtn {
  background-color: tomato;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  padding: 2px 4px;
  margin: 3px;
  border: none;
}
</style>