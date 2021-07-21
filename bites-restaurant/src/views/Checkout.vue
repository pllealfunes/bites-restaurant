<template>
  <div id="wrapper">
    <h1>Checkout</h1>
    <div v-if="showConfirmationMessage">
      <h2>Thank You!</h2>
      <p>A confirmation email was sent to the email provided</p>
    </div>
    <div id="checkout">
      <div id="checkoutForm">
        <label>First Name</label>
        <input type="text" v-model="fname" />
        <label>Last Name</label>
        <input type="text" v-model="lname" />
        <label>Email:</label>
        <input type="email" v-model="email" />
        <label for="orderType">Order Type</label>
        <select name="orderType" v-model="orderType" @change="showCardOption">
          <option disabled value="">Please select one</option>
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>
        <div v-if="deliverySelect" id="deliverySelect">
          <label>Address</label>
          <input type="text" required v-model="address" />
          <label>Town</label>
          <input type="text" required v-model="town" />
          <label>Zip Code</label>
          <input type="text" required v-model="zipCode" />
        </div>
        <label v-if="paymentSelectTitle" for="payment">Payment Method</label>
        <select
          v-if="paymentSelect"
          name="payment"
          v-model="payment"
          @change="showCardOption"
        >
          <option disabled value="">Please select one</option>
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
          @click="checkout"
        >
          Checkout
        </button>
      </div>
      <div id="orderContainer">
        <ul id="cart">
          <li v-for="food in list" :key="food.id">
            {{ food.quantity }} - {{ food.title }} - ${{ food.price }}
            <button @click="incrementDish(food)" id="incrementBtn">
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
  </div>
</template>

<script>
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
      deliverySelect: false,
      paymentSelect: false,
      paymentSelectTitle: false,
      orderType: "",
      address: "",
      town: "",
      zipCode: "",
      showConfirmationMessage: false,
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
      switch (true) {
        case this.fname.length > 1 &&
          this.lname.length > 1 &&
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.email
          ) &&
          this.orderType == "pickup" &&
          this.payment == "card" &&
          this.address != "" &&
          this.town != "" &&
          this.zipCode != "" &&
          this.cardNumber != "" &&
          this.secCode != "" &&
          this.list.length >= 1:
        case (this.fname.length > 1 &&
          this.lname.length > 1 &&
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.email
          ) &&
          this.orderType == "delivery" &&
          this.payment == "card" &&
          this.address != "" &&
          this.town != "" &&
          this.zipCode != "") ||
          (this.cardNumber != "" &&
            this.secCode != "" &&
            this.list.length >= 1):
        case this.fname.length > 1 &&
          this.lname.length > 1 &&
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.email
          ) &&
          this.orderType == "pickup" &&
          this.payment == "instore" &&
          this.list.length >= 1:
          return false;
        default:
          return true;
      }
    },
  },
  methods: {
    decrementDish(food) {
      this.$store.dispatch("deleteFromCart", food);
    },
    incrementDish(food) {
      this.$store.dispatch("addFromCart", food);
    },
    showCardOption() {
      if (this.orderType == "delivery") {
        this.cardOption = true;
        this.deliverySelect = true;
        this.paymentSelect = false;
        this.paymentSelectTitle = true;
      } else if (this.orderType == "pickup") {
        this.paymentSelect = true;
        this.paymentSelectTitle = true;
        if (this.payment == "card") {
          this.cardOption = true;
          this.deliverySelect = true;
        } else {
          this.cardOption = false;
          this.deliverySelect = false;
        }
      } else {
        this.cardOption = false;
        this.deliverySelect = false;
        this.paymentSelect = false;
        this.paymentSelectTitle = false;
      }
    },
    checkout() {
      this.showConfirmationMessage = true;
      this.fname = "";
      this.lname = "";
      this.email = "";
      this.payment = "";
      this.cardOption = false;
      this.cardNumber = "";
      this.secCode = "";
      this.deliverySelect = false;
      this.paymentSelect = false;
      this.paymentSelectTitle = false;
      this.orderType = "";
      this.address = "";
      this.town = "";
      this.zipCode = "";
      this.$store.dispatch("checkout");
      setTimeout(() => (this.showConfirmationMessage = false), 2000);
    },
  },
};
</script>

<style scoped lang="scss">
#wrapper {
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
#deliverySelect {
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