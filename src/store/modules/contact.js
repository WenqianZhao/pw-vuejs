import axios from 'axios';

const state = {
	allAdvices: [],
};

const getters = {
	allAdvices: state => state.allAdvices,
};

const actions = {

	SUBMIT_ADVICE: function({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'contact/add', postData).then(function (response) {
				if (response.data.response.status_code === 3001) {
					resolve('success');
				} else {
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});	
	},

	GET_ALL_ADVICES: function({commit}) {
		axios.get(process.env.SERVER_ENV + 'contact/getall').then(function (response) {
			var allAdvices = response.data.response.data;
			commit('SET_ALL_ADVICES', {allAdvices: allAdvices});
			commit('SET_LOADING', {flag: false});
		});
	},

	DELETE_ADVICE: function({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'contact/delete', postData).then(function (response) {
				if (response.data.response.status_code === 3006) {
					var allAdvices = response.data.response.data;
					commit('SET_ALL_ADVICES', {allAdvices: allAdvices});
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
	SET_ALL_ADVICES: function(state, {allAdvices}) {
		state.allAdvices = allAdvices;
	},
};

export default {
	state,
	getters,
	actions,
	mutations
}
