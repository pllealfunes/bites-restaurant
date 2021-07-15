<template>
  <div class="wrapper">
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
        <input type="text" required v-model="fname" />
        <label>Last Name</label>
        <input type="text" required v-model="lname" />
        <label>Email:</label>
        <input type="email" required v-model="email" />
        <label for="orderType">Order Type</label>
        <select name="orderType" v-model="orderType" @change="showAddressInput">
          <option value="onlineOrder">Online Order</option>
          <option value="pickup">Pickup</option>
        </select>
        <div v-if="onlineOrderSelect">
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
        <div v-if="cardOption">
          <label>Card</label>
          <input type="text" required v-model="cardNumber" />
          <label>Security Code</label>
          <input type="text" required v-model="secCode" />
        </div>
        <button @click="checkout">Checkout</button>
      </form>
      <ul id="cart">
        <li v-for="food in list" :key="food.id">
          {{ food.title }} - {{ food.price }} - {{ food.quantity }}
          <button @click="incrementDish(food.id)">Add</button>
          <button @click="decrementDish(food)">Delete</button>
        </li>
      </ul>
      <div>Total: ${{ cartTotal }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: null,
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
    };
  },
  computed: {
    list() {
      return this.$store.getters.cartProducts;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
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
    checkout() {
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
    },
  },
};
</script>

<style>
#checkout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2rem;
}

#checkoutForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

#checkoutForm,
#cart {
  margin: 2rem;
}
</style>