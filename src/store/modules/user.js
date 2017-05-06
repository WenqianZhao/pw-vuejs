import axios from 'axios';
import jwt from 'jsonwebtoken';

const secret = "PeterZhao's Website";

const state = {
	token: "",
	userObj: {},
	status: null
};

const getters = {
	token: state => state.token,
	userObj: state => state.userObj,
	status: state => state.status
};

const actions = {
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
}

export default {
	state,
	getters,
	actions,
	mutations
}
