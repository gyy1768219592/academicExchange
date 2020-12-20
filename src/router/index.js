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
    path: "/personIndex",
    name: "PersonIndex",
    component: () => import("../views/personalWorkplace/personIndex.vue"),
  },
  {
    path: "/findPwd",
    name: "findPwd",
    component: () => import("../views/personalWorkplace/findPwd.vue"),
  },
  {
    path: "/searchResult",
    name: "searchResult",
    component: () => import("../views/homes/searchResult.vue"),
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
    //数据库门户
    path: "/authorIndex",
    name: "authorIndex",
    component: () => import("../views/scholar/authorIndex.vue"),
  },
  {
    //论文内容展示
    path: "/paperDisplay/:id",
    name: "paperDisplay",
    component: () => import("../views/artcle/paperDisplay.vue"),
  },
  {
    //国家项目内容展示
    path: "/progDisplay/:id",
    name: "progDisplay",
    component: () => import("../views/artcle/progDisplay.vue"),
  },
  {
    //专利内容展示
    path: "/patentDisplay/:id",
    name: "patentDisplay",
    component: () => import("../views/artcle/patentDisplay.vue"),
  },
  {
    //管理员
    path: "/Manager",
    name: "manager",
    component: () => import("../views/managerMent/Manager.vue"),
  },
  {
    //认证
    path: "/user/verify/:CODE",
    name: "userVerify",
    component: () => import("../views/personalWorkplace/userVerify.vue")
  },
  {
    path: "/user/scholarVerify/:CODE",
    name: "scholarVerify",
    component: () => import("../views/personalWorkplace/scholarVerify.vue")
  },
  {
    path: "/user/claimScholar",
    name: "claimScholar",
    component: () => import("../views/personalWorkplace/ClaimScholar.vue")
  },
  //收藏
  {
    path: "/collect",
    name: "collect",
    component: () => import("../views/message/collect.vue")
  },
  //关注
  {
    path: "/concern",
    name: "concern",
    component: () => import("../views/message/concern.vue")
  },
  //消息
  {
    path: "/message",
    name: "message",
    component: () => import("../views/message/message.vue")
  },
  //发送消息
  {
    path: "/sendMessage",
    name: "sendMessage",
    component: () => import("../views/message/sendMessage.vue")
  },
  //消息主页
  {
    path: "/messageInfo",
    name: "messageInfo",
    component: () => import("../views/message/messageInfo.vue")
  },
  {
    path: "/appealTest",
    name: "appealTest",
    component: () => import("../views/appeal/appealTest.vue")
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
