// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import App from './App';

// Import components
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';

import jwt from 'jsonwebtoken';

import store from './store';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    canReuse: false,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    // Only admin can access this page
    // beforeEnter: (to, from, next) => {
    //   // If not admin
    //   const admin = false;
    //   if(!admin){
    //     next('/');
    //   }else{
    //     next();
    //   }
    // },
  },
];

const router = new VueRouter({
  routes,
});

// If need to do sth before each routing
router.beforeEach((to, from, next) => {
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
