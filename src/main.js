// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'

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
import BlogAll from './components/blog/BlogAll';
import Account from './components/user/Account';
import Profile from './components/user/Profile';
import ChangePassword from './components/user/ChangePassword';
import UserCollection from './components/user/UserCollection';

// admin
import AdminPost from './components/admin/AdminPost';
import AdminPostCreate from './components/admin/post/AdminPostCreate';
import AdminPostGetAll from './components/admin/post/AdminPostGetAll';

import jwt from 'jsonwebtoken';

import store from './store';
import messages from './assets/i18n/messages.js';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueI18n);

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
    path: '/user',
    name: 'account',
    component: Account,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: 'changepassword',
        name: 'changePassword',
        component: ChangePassword,
      },
      {
        path: 'collection',
        name: 'userCollection',
        component: UserCollection,
      }
    ]
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog,
    children: [
      {
        path: 'all',
        name: 'allBlogs',
        component: BlogAll,
      },
      {
        path: 'tag/:name',
        name: 'blogByTag',
        component: BlogByTag,
      },
      {
        path: 'search/:content',
        name: 'blogSearch',
        component: BlogSearch,
      }
    ]
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

    //   if (store.state.user.token || token) {
    //     var currToken = (store.state.user.token) ? store.state.user.token : token;
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

router.beforeEach((to, from, next) => {
    var token = window.localStorage.getItem('token');
    if (store.state.user.token || token) {
      var currToken = (store.state.user.token) ? store.state.user.token : token;
      // verify token
      jwt.verify(currToken, secret, function(err, decoded){
        if(decoded){
          store.dispatch('SET_USER_STATE', {token: currToken, decoded: decoded})
          .then((message) => {
            next();
          });
        } else {
          next({
            path: '/logout'
          });
        }
      });
    } else {
      // Not logged in
      next();
    }
})

// for different language
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});
