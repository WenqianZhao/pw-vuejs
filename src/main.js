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
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout'
  },
  {
    path: '/user',
    name: 'account',
    component: Account,
    meta: { requiresAuth: true },
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
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAdmin: true },
    children:[
      {
        path: 'posts',
        name: 'adminPost',
        component: AdminPost,
        children: [
          {
            path: 'create',
            name: 'adminPostCreate',
            component: AdminPostCreate,
          },
          {
            path: 'getall',
            name: 'adminPostGetAll',
            component: AdminPostGetAll,
          }
        ]
      }
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.path === "/logout"){
    // Logout
    store.dispatch('RESET_USER_STATE');
    // remove token
    window.localStorage.removeItem('token');
    console.log("logout");
    next({
      path: '/'
    });
  }

  var token = window.localStorage.getItem('token');
  if (store.state.user.token || token) {
    token = (store.state.user.token) ? store.state.user.token : token;
    // verify token
    jwt.verify(token, secret, function(err, decoded){
      if (err) {
        console.log("err: " + err.message);
        next({
          path: '/logout'
        });
      } else {
        if(decoded){
          // If user is admin
          if(decoded.role === "Admin") {
            store.dispatch('SET_USER_STATE', {token: token, decoded: decoded})
            .then((message) => {
              next();
            });
          } else {
            // If user is normal user
            if(to.matched.some(record => record.meta.requiresAdmin)) {
              store.dispatch('SET_USER_STATE', {token: token, decoded: decoded})
              .then((message) => {
                next({
                  path: '/'
                });
              });
            } else {
              store.dispatch('SET_USER_STATE', {token: token, decoded: decoded})
              .then((message) => {
                next();
              });
            }
          }
        } else {
          next({
            path: '/logout'
          });
        }
      }
    });
  } else {
    if(to.matched.some(record => record.meta.requiresAdmin) || to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: '/login'
      })
    } else {
      // Not logged in
      next();
    }
  }
});

// for different language
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale messages
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});
