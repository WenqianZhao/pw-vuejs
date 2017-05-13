import Vue from 'vue';
import Vuex from 'vuex';

// Import modules
import user from './modules/user';
import post from './modules/post';
import comment from './modules/comment';
import contact from './modules/contact';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
  	user,
  	post,
  	comment,
  	contact,
  },
});
