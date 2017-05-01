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
import Blog from './components/Blog';
import About from './components/About';
import OnePost from './components/OnePost';
import BlogByTag from './components/blog/BlogByTag';
import BlogSearch from './components/blog/BlogSearch';

// admin
import AdminPost from './components/admin/AdminPost';
import AdminPostCreate from './components/admin/post/AdminPostCreate';
import AdminPostGetAll from './components/admin/post/AdminPostGetAll';

import jwt from 'jsonwebtoken';

import store from './store';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

var localConfig = require('../config/local.js');
var secret = localConfig.secret;

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
    path: '/blog',
    name: 'blog',
    component: Blog,
  },
  {
    path: '/blog/tag/:name',
    name: 'blogByTag',
    component: BlogByTag,
  },
  {
    path: '/blog/search/:content',
    name: 'blogSearch',
    component: BlogSearch,
  },
  {
    path: '/blog/:id',
    name: 'onePost',
    component: OnePost,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
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
    children:[
      {
        path: 'posts',
        name: 'adminPost',
        component: AdminPost,
        children: [
          {
            path: 'create',
            name: 'adminPostCreate',
            component: AdminPostCreate
          },
          {
            path: 'getall',
            name: 'adminPostGetAll',
            component: AdminPostGetAll
          }
        ]
      }
    ],
    // Only admin can access this page
    // beforeEnter: (to, from, next) => {
    //   var token = window.localStorage.getItem('token');

    //   if (store.state.user.token !== "" || token !== "") {
    //     var currToken = (store.state.user.token !== "") ? store.state.user.token : token;
    //     // verify token
    //     jwt.verify(currToken, secret, function(err, decoded){
    //       if(!err && decoded.role === "Admin"){
    //         next();
    //       }else{
    //         // not admin, go back to home
    //         next({
    //           path: '/'
    //         });
    //       }
    //     });
    //   } else {
    //     // not admin, go back to home
    //     next({
    //       path: '/'
    //     });
    //   }
    // },
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
