import axios from 'axios';

const state = {
	allCategories: [],
};

const getters = {
	allCategories: state => state.allCategories,
};

const actions = {
	GET_ALL_CATEGORIES: function ({commit}) {
		axios.get(process.env.SERVER_ENV + 'category/getall').then(function (response) {
			if (response.data.response.status_code === 3202) {
				var allCategories = response.data.response.data;
				commit('SET_ALL_CATEGORIES', {allCategories: allCategories});
			} 
			commit('SET_LOADING', {flag: false});
		}).catch(function(err){
			console.log(err);
		});
	},
	ADD_NEW_CATEGORY: function({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'category/createone', postData).then(function (response) {
				if (response.data.response.status_code === 3206) {
					var newCategory = response.data.response.data;
					commit('SET_NEW_CATEGORY', {newCategory: newCategory});
					resolve('success');
				} else {
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});	
	},
	ADD_POST_TO_CATEGORY: function({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'category/addpost', postData).then(function (response) {
				if (response.data.response.status_code === 3209) {
					resolve('success');
				} else {
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});	
	}
};

const mutations = {
	SET_ALL_CATEGORIES: (state, {allCategories}) => {
		state.allCategories = allCategories;
	},
	SET_NEW_CATEGORY: (state, {newCategory}) => {
		state.allCategories.push(newCategory);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}