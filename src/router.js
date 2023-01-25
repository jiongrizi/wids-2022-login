import { createRouter, createWebHashHistory } from "vue-router";
const login = () => import("./components/login.vue")
const register = () => import("./components/register.vue")



let routes = [
  { path: "/", component: login },
  { path: "/login", component: login },
  { path: "/register", component: register },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router