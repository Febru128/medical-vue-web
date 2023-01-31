/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2021-04-25 20:58:38
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-12 15:37:09
 * @FilePath: \element-made\vue-made-web\src\router\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved. 
 */
import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
// import Login from '../components/login.vue'
// import Register from '../components/register.vue'
// import Register from '../components/register.vue'
const Login = () => import("../components/login.vue");
const Home = () => import("../components/home.vue");
const Register = () => import("../components/register.vue");
const Welcome = () => import("../components/welcome.vue");
const Doctor = () => import("../components/doctor/doctor.vue");
const Patient = () => import("../components/patient/patient.vue");
const Python = () => import("../components/python.vue");
const Dairy = () => import("../components/dairy.vue");
const Table = () => import("../components/table.vue");
const Talk = () => import("../components/talk.vue");
const Problem = () => import("../components/problem.vue");

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: Welcome },
      { path: "/doctor", component: Doctor },
      { path: "/patient", component: Patient },
      { path: "/dairy", component: Dairy },
      { path: "/python", component: Python },
      { path: "/table", component: Table },
      { path: "/talk", component: Talk },
      { path: "/problem", component: Problem },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === "/login" || to.path === "/register") return next();
  // 获取isLogin
  const isLogin = window.sessionStorage.getItem("isLogin");
  // 没有isLogin, 强制跳转到登录页
  if (!isLogin) return next("/login");
  next();
});
export default router;
