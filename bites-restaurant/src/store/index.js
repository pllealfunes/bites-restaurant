
import { createStore } from "vuex";
//import createPersistedState from "vuex-persistedstate";

/*export const store = createStore({
  state() { return { cartCount: 0, food: [] } },
  getters: {
    getFoodById(state) {
      return function (id) {
        return state.food.filter((food) => {
          return food.id == id;
        }, this.id)[0];
      }
    }
  },
  mutations: {
    setCartCount(state, payload) {
      state.food = payload;
    },
    setMenu(state, payload) {
      state.food = payload
    }
  },
  actions: {
    fetchFood(context) {
      fetch("http://localhost:3000/menu")
        .then((res) => res.json())
        .then((data) => (context.commit('setMenu', data)))
        .catch((err) => console.log(err.message));
    }
  },
  modules: {},
});*/

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
    SET_MENU(state, payload) {
      state.menu = payload
    }
  },
  // Methods that can contain async. code
  // Can not directly alter the state - has to change state
  // by committing mutations
  actions: {
    getMenu({ commit }) {
      fetch("http://localhost:3000/Menu")
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
    }
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
          title: dish.title,
          price: dish.price,
          quantity: cartItem.quantity
        }
      })
    }
  },
})

export default store
