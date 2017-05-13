import axios from 'axios';
import jwt from 'jsonwebtoken';

const secret = "PeterZhao's Website";

const state = {
	token: "",
	userObj: {},
	status: null,
	allUsers: [],
};

const getters = {
	token: state => state.token,
	userObj: state => state.userObj,
	status: state => state.status,
	allUsers: state => state.allUsers,
};

const actions = {
	REFRESH_TOKEN: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'token/refresh', postData).then(function (response) {
				var data = response.data.response.data;
				// If successfully refresh token
				if (response.data.response.status_code === 1013) {
					// store the token in localstorage
					window.localStorage.setItem('token', data.token);
					resolve(data.token);
				} else {
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});
	},

	GET_USER_OBJECT: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			var data = {};

			axios.post(process.env.SERVER_ENV + 'login', postData).then(function (response) {
				// If successfully logged in
				if (response.data.response.status_code === 1004) {
					data = response.data.response.data;
					jwt.verify(data.token, secret, function(err, decoded){
						if(err){
							console.log(err);
						}else{
							// store the token in localstorage
							window.localStorage.setItem('token', data.token);
							var userData = {
								token: data.token,
								// contains id, username, email and role
								userObj: {
									username: decoded.username,
									email: decoded.email,
									role: decoded.role,
									firstname: decoded.firstname,
									lastname: decoded.lastname,
									age: decoded.age,
									gender: decoded.gender,
									imgUrl: decoded.imgUrl,
								},
								status: null
							}
							commit('SET_USER_DATA', userData);
							resolve('success');
						}
					});
				} else {
					var status = "";
					switch (response.data.response.status_code) {
						case 1002:
							status = "No such user.";
							break;
						case 1005:
							status = "Wrong password.";
							break;
						default:
							status = "";
					};
					var userData = {
						token: null,
						userObj: null,
						status: status
					};
					commit('SET_USER_DATA', userData);
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});
	},
	SET_USER_OBJECT: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			var data = {};

			axios.post(process.env.SERVER_ENV + 'signup', postData).then(function (response) {
				// If successfully logged in
				if (response.data.response.status_code === 1000) {
					data = response.data.response.data;
					jwt.verify(data.token, secret, function(err, decoded){
						if(err){
							console.log(err);
						}else{
							// store the token in localstorage
							window.localStorage.setItem('token', data.token);
							var userData = {
								token: data.token,
								// contains id, username, email and role
								userObj: {
									username: decoded.username,
									email: decoded.email,
									role: decoded.role,
									firstname: decoded.firstname,
									lastname: decoded.lastname,
									age: decoded.age,
									gender: decoded.gender,
									imgUrl: decoded.imgUrl,
								},
								status: null
							}
							commit('SET_USER_DATA', userData);
							resolve('success');
						}
					});
				} else {
					var status = "";
					switch (response.data.response.status_code) {
						case 1006:
							status = "Duplicate user.";
							break;
						default:
							status = "";
					};
					var userData = {
						token: null,
						userObj: null,
						status: status
					};
					commit('SET_USER_DATA', userData);
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});
	},
	SET_USER_STATE: function({commit}, {token, decoded}) {
		return new Promise( (resolve) => {
			var userData = {
				token: token,
				// contains id, username, email and role
				userObj: {
					username: decoded.username,
					email: decoded.email,
					role: decoded.role,
					firstname: decoded.firstname,
					lastname: decoded.lastname,
					age: decoded.age,
					gender: decoded.gender,
					imgUrl: decoded.imgUrl,
				},
				status: null
			};
			commit('SET_USER_DATA', userData);
			resolve('success');
		});
	},
	RESET_USER_STATE: function ({commit}) {
		commit('RESET_USER_STATE');
	},
	// Modify personal information
	MODIFY_PERSONAL_INFO: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'user/modify', postData).then(function (response) {
				// If successfully modified personal info
				if (response.data.response.status_code === 1009) {
					var data = response.data.response.data;
					jwt.verify(data.token, secret, function(err, decoded){
						if(err){
							console.log(err);
						}else{
							// store the token in localstorage
							window.localStorage.setItem('token', data.token);
							var userData = {
								token: data.token,
								// contains id, username, email and role
								userObj: {
									username: decoded.username,
									email: decoded.email,
									role: decoded.role,
									firstname: decoded.firstname,
									lastname: decoded.lastname,
									age: decoded.age,
									gender: decoded.gender,
									imgUrl: decoded.imgUrl,
								},
								status: null
							}
							commit('SET_USER_DATA', userData);
							resolve('success');
						}
					});
				} else {
					var userData = {
						token: null,
						userObj: null,
						status: "Error occurs when update a user's info."
					};
					commit('SET_USER_DATA', userData);
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});
	},
	CHANGE_PASSWORD: function ({commit, state}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'user/changepwd', postData).then(function (response) {
				// If successfully changed password
				if (response.data.response.status_code === 1011) {
					var data = response.data.response.data;
					jwt.verify(data.token, secret, function(err, decoded){
						if(err){
							console.log(err);
						}else{
							// store the token in localstorage
							window.localStorage.setItem('token', data.token);
							var userData = {
								token: data.token,
								// userObj remains the same
								userObj: state.userObj,
								status: null
							}
							commit('SET_USER_DATA', userData);
							resolve('success');
						}
					});
				} else {
					var userData = {
						token: null,
						userObj: null,
						status: "Error occurs when changing password."
					};
					commit('SET_USER_DATA', userData);
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});
	},

	GET_ALL_COLLECTIONS: function ({commit}, postData) {
		axios.post(process.env.SERVER_ENV + 'user/getallcollections', postData).then(function (response) {
			var allPosts = response.data.response.data;
			if(allPosts){
				allPosts = allPosts.reverse();
			}
			commit('SET_ALL_POSTS', {allPosts: allPosts});
			commit('SET_LOADING', {flag: false});
		}).catch(function(err){
			console.log(err);
		});
	},

	GET_ALL_USERS: function ({commit}) {
		axios.get(process.env.SERVER_ENV + 'user/getall').then(function (response) {
			var allUsers = response.data.response.data;
			commit('SET_ALL_USERS', {allUsers: allUsers});
			commit('SET_LOADING', {flag: false});
		}).catch(function(err){
			console.log(err);
		});
	},
};

const mutations = {
	SET_USER_DATA: (state, {token, userObj, status}) => {
		state.token = token;
		state.userObj = userObj;
		state.status = status;
	},
	RESET_USER_STATE: (state) => {
		state.token = "";
		state.userObj = {};
		state.status = null;
	},
	SET_ALL_USERS: (state, {allUsers}) => {
		state.allUsers = allUsers;
	},
};

export default {
	state,
	getters,
	actions,
	mutations
}
