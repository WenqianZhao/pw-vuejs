import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';

// Import modules
import user from './modules/user';
import post from './modules/post';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
  	user,
  	post
  },
});
