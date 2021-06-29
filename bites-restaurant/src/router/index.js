import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Dish from "../views/Dish.vue";
import Cart from "../views/Cart.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/menu",
    name: "Menu",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    /*component: () =>
      import("../views/Menu.vue"),*/
    component: Menu,
  },
  {
    path: "/dish/:id",
    name: "Dish",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    /*component: () =>
      import("../views/Menu.vue"),*/
    component: Dish,
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
