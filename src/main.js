import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import api from "./api/index.js";
import path from "./api/path.js";
import echarts from "echarts";
import md5 from "js-md5";
import axios from 'axios';


Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(echarts);
Vue.prototype.$api = api;
Vue.prototype.$urlPath = path;
Vue.prototype.$md5 = md5;

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Vue.prototype.$addStorageValue = function(key, data, type=true) {
  if(type) {
    //创建一个StroageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  }
}





new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
