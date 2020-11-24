import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/personalWorkplace/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/personalWorkplace/register.vue"),
  },
  {
    path: "/personInfo",
    name: "PersonInfo",
    component: () => import("../views/personalWorkplace/personInfo.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/personalWorkplace/register.vue"),
  },
  {
    path: "/findPwd",
    name: "findPwd",
    component: () => import("../views/personalWorkplace/findPwd.vue"),
  },
  {
    //用户个人学者门户
    path: "/userIndex",
    name: "userIndex",
    component: () => import("../views/scholar/userIndex.vue"),
  },
  {
    //其他学者门户
    path: "/scholarIndex",
    name: "scholarIndex",
    component: () => import("../views/scholar/scholarIndex.vue"),
  },
  {
    //文章内容展示
    path: "/artcleDisplay",
    name: "artcleDisplay",
    component: () => import("../views/artcle/artcleDisplay.vue"),
  },
];

const router = new VueRouter({
  routes,
});
//控制访问权限
/*router.beforeEach((to, from, next) => {
  if (
    to.path === "/login" ||
    to.path === "/" ||
    to.path === "/register" ||
    to.path === "/about" ||
    to.path === "/index" ||
    to.path === "/findPwd"
  ) {
    console.log("2222");
    return next();
  } else {
    console.log("111111");
    window.sessionStorage.setItem("WebAdrs", window.location.href);
    const tokenStr = window.sessionStorage.getItem("UserId");
    if (!tokenStr) return next("/login");
    next();
  }
});*/
export default router;
