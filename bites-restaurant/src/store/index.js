
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      cart: [],
      menu: [],
    }
  },
  //plugins: [createPersistedState()],
  // Methods used to alter the state of our store
  mutations: {
    PUSH_ITEM_TO_CART(state, payload) {
      state.cart.push({
        id: payload,
        quantity: 1
      });
    },
    INCREMENT_ITEM_QUANTITY(state, payload) {
      payload.quantity++
    },
    DECREMENT_ITEM_QUANTITY(state, payload) {
      payload.quantity--
    },
    SET_MENU(state, payload) {
      state.menu = payload
    },
    emptyCart(state) {
      state.cart = []
    }
  },
  // Methods that can contain async. code
  // Can not directly alter the state - has to change state
  // by committing mutations
  actions: {
    getMenu({ commit }) {
      fetch("http://localhost:3000/menu", {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => res.json())
        .then((data) => (commit("SET_MENU", data)))
        .catch((err) => console.log(err.message));
    },
    addToCart(context, food) {
      const cartItem = context.state.cart.find(item => item.id === food.id)
      if (!cartItem) {
        context.commit('PUSH_ITEM_TO_CART', food.id)
      } else {
        context.commit('INCREMENT_ITEM_QUANTITY', cartItem)
      }
    },
    deleteFromCart(context, food) {
      const cartItem = context.state.cart.find(item => item.id === food.id)
      if (cartItem.quantity > 1) context.commit('DECREMENT_ITEM_QUANTITY', cartItem);
      else
        context.state.cart = context.state.cart.filter(
          (item) => item.id !== food.id
        );
    },
    addFromCart(context, food) {
      const cartItem = context.state.cart.find(item => item.id === food.id)
      if (cartItem.quantity >= 1) context.commit('INCREMENT_ITEM_QUANTITY', cartItem);
    },
    checkout(context) {
      context.state.cart
      context.commit('emptyCart')
    },
  },
  getters: {
    getFoodById(state) {
      return function (id) {
        return state.menu.filter((food) => {
          return food.id == id;
        }, id)[0];
      }
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        let dish = state.menu.find(food => food.id == cartItem.id)
        return {
          id: dish.id,
          title: dish.title,
          price: dish.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters) {
      let total = 0
      getters.cartProducts.forEach(dish => {
        total += dish.price * dish.quantity
      })
      return total.toFixed(2)
    },
    cartItemTotal(state, getters) {
      let itemsTotal = 0;
      getters.cartProducts.forEach(
        (item) => (itemsTotal += item.quantity)
      );
      return itemsTotal;
    },
  },
})

export default store
