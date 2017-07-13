import axios from 'axios';

const state = {
	todolistItems: [],
};

const getters = {
	todolistItems: state => state.todolistItems,
};

const actions = {

	GET_TODOLIST: function({commit}, postData) {
		axios.post(process.env.SERVER_ENV + 'app/todolist/getallitems', postData).then(function (response) {
			if (response.data.response.status_code === 3102) {
				var todolistItems = response.data.response.data;
				commit('SET_TODOLIST_ITEMS', {todolistItems: todolistItems});
			} else {
				commit('SET_TODOLIST_ITEMS', {todolistItems: []});
			}
			commit('SET_LOADING', {flag: false});
		});
	},

	ADD_NEW_TASK: function({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'app/todolist/addnewitem', postData).then(function (response) {
				if (response.data.response.status_code === 3104) {
					var newTask = response.data.response.data;
					commit('SET_NEW_TASK', {newTask: newTask});
					resolve('success');
				} else {
					resolve('failure');
				}
			});
		}).catch(function (error) {
			reject(error);
		});	
	},

	MODIFY_TODOLIST_ITEM: function ({commit}, postData) {
		axios.post(process.env.SERVER_ENV + 'app/todolist/modifyitem', postData).then(function (response) {
			if (response.data.response.status_code === 3106) {
				commit('MODIFY_TODOLIST_ITEM', {index: postData.index, content: postData.content});
			}
		});
	}
};

const mutations = {
	SET_TODOLIST_ITEMS: function(state, {todolistItems}) {
		state.todolistItems = todolistItems.map(function (item) {
			var today = new Date();
			var deadline = new Date(item.deadline);
			var daysRemain = (deadline - today)/(24*60*60*1000);
			if (daysRemain < -1) {
				// over the deadline
				// do sth here
			} else {
				return {
					id: item.id,
					content: item.content,
					importance: item.importance,
					daysRemain: parseInt(daysRemain)
				}
			}
		});
	},
	SET_NEW_TASK: function(state, {newTask}) {
		var deadline = new Date(newTask.deadline);
		var today = new Date();
		var daysRemain = (deadline - today)/(24*60*60*1000);
		newTask['daysRemain'] = parseInt(daysRemain);
		state.todolistItems.push(newTask);
	},
	MODIFY_TODOLIST_ITEM: function(state, {index, content}) {
		state.todolistItems[index].content = content;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
