
import { createStore } from "vuex";

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
      cartCount: 0,
      menu: [],
      category: []
    }
  },
  // Methods used to alter the state of our store
  mutations: {
    setCartCount(state, payload) {
      state.cartCount = payload;
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
  },
  getters: {
    getFoodById(state) {
      return function (id) {
        return state.menu.filter((food) => {
          return food.id == id;
        }, this.id)[0];
      }
    },
  }
})

export default store
