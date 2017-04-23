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
import Signup from './components/Signup';

import jwt from 'jsonwebtoken';

import store from './store';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

var localConfig = require('../config/local.js');
var secret = localConfig.secret;

function verifyToken(token) {
  jwt.verify(token, secret, function(err, decoded){
    if(err){
      return {isErr: true, err: err};
    }else{
      return {isErr: false, decoded: decoded};
    }
  });
}

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
    beforeEnter: (to, from, next) => {
      // Logout
      store.dispatch('RESET_USER_STATE');
      // remove token
      window.localStorage.removeItem('token');
      next({
        path: '/'
      });
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    // Only admin can access this page
    beforeEnter: (to, from, next) => {
      var token = window.localStorage.getItem('token');

      if (store.state.user.token !== "" || token !== "") {
        var currToken = (store.state.user.token !== "") ? store.state.user.token : token;
        // verify token
        var verifiedToken = verifyToken(currToken);
        if (!verifiedToken.isErr) {
          if (verifiedToken.decoded.role === "Admin") {
            next();
          }
        }
      }
      // not admin, go back to home
      next({
        path: '/'
      });
    },
  },
];

const router = new VueRouter({
  routes,
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
