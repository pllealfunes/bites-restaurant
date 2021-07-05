import { createStore } from "vuex";

export default createStore({
  state: { cartCount: 0, food: [] },
  mutations: {
    setCartCount(state, payload) {
      state.cartCount = payload;
    }
  },
  actions: {},
  modules: {},
});
