import axios from 'axios';

const state = {
	commentLoading: false,
	allRootComments: [],
	// Construct as obj for quick fetching
	// use comment.id as key and comment obj as value
	allComments: {},
};

const getters = {
	commentLoading: state => state.commentLoading,
	allComments: state => state.allComments,
	allRootComments: state => state.allRootComments,
};

const actions = {
	GET_ALL_COMMENTS_BY_POSTID: function ({commit}, postData) {
		axios.post(process.env.SERVER_ENV + 'comments/getbypost', postData).then(function (response) {
			var allComments = response.data.response.data;
			var allRootComments = allComments.filter(function(comment){
				return comment.isRoot === true;
			});
			commit('SET_ALL_COMMENTS', {allComments: allComments});
			commit('SET_ALL_ROOT_COMMENTS', {allRootComments: allRootComments});
			commit('SET_COMMENT_LOADING', {flag: false});
		}).catch(function(err){
			console.log(err);
		});
	},

	ADD_ROOT_COMMENT: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'comments/add/root', postData).then(function (response) {
				if (response.data.response.status_code === 2202) {
					var newRootComment = response.data.response.data;
					commit('ADD_ONE_ROOT_COMMENT', {newRootComment: newRootComment});
					commit('SET_COMMENT_LOADING', {flag: false});
					resolve("success");
				} else {
					resolve("failure");
				}
			});
		}).catch(function (error) {
			reject(error);
		});
	},

	SET_COMMENT_LOADING_ACTION: function ({commit}, flag) {
		commit('SET_COMMENT_LOADING', {flag: flag});
	},

};

const mutations = {
	SET_COMMENT_LOADING: function (state, {flag}) {
		state.commentLoading = flag;
	},

	SET_ALL_COMMENTS: function (state, {allComments}) {
		if(allComments.length > 0){
			allComments.forEach(function(comment){
				state.allComments[comment.id] = comment;
			});
		} else {
			state.allComments = {};
		}
	},

	ADD_ONE_ROOT_COMMENT: function (state, {newRootComment}) {
		state.allComments[newRootComment.id] = newRootComment;
		state.allRootComments.push(newRootComment);
	},

	SET_ALL_ROOT_COMMENTS: function (state, {allRootComments}) {
		state.allRootComments = allRootComments;
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
