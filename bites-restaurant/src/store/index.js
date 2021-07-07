
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
      food: [],
      category: []
    }
  },
  // Methods used to alter the state of our store
  mutations: {
    setCartCount(state, payload) {
      state.cartCount = payload;
    },
    SET_MENU(state, payload) {
      state.food = payload
    }
  },
  // Methods that can contain async. code
  // Can not directly alter the state - has to change state
  // by committing mutations
  actions: {
    async fetchFood({ commit }) {
      /*fetch("http://localhost:3000/Menu")
        .then((res) => res.json())
        .then((data) => (commit("SET_MENU", data)))
        .catch((err) => console.log(err.message));*/
      try {
        const response = await this.$http.get("http://localhost:3000/Menu");
        // JSON responses are automatically parsed.
        commit("SET_MENU", response.data)
      }
      catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getFoodById(state) {
      return function (id) {
        return state.food.filter((food) => {
          return food.id == id;
        }, this.id)[0];
      }
    },
  }
})

export default store
