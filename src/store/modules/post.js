import axios from 'axios';

const state = {
	currentPostID: null,
	currentPost: {},
	allPosts: [],
	loading: false,
};

const getters = {
	currentPostID: state => state.currentPostID,
	currentPost: state => state.currentPost,
	allPosts: state => state.allPosts,
	loading: state => state.loading,
};

const actions = {
	CREATE_NEW_POST: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			var data = {};
			console.log(postData);
			axios.post(process.env.SERVER_ENV + 'posts/create', postData).then(function (response) {

				// If post is successfully created
				if (response.data.response.status_code === 1512) {
					console.log(response.data.response.data);
					commit('SET_CURRENT_POST_ID', response.data.response.data);
					resolve({
						message: 'success',
						post_id: response.data.response.data
					});
				} else {
					var status = "";
					switch (response.data.response.status_code) {
						case 1506:
							status = "Duplicate post title.";
							break;
						default:
							status = "";
					};
					commit('SET_CURRENT_POST_ID', { postID: null });
					resolve({
						message: status,
						post_id: null
					});
				}
			});
		});
	},

	GET_ALL_POSTS: function ({commit}) {
		axios.get(process.env.SERVER_ENV + 'posts/getall').then(function (response) {
			var postData = response.data.response.data;
			commit('SET_ALL_POSTS', {allPosts: postData.reverse()});
			commit('SET_LOADING', {flag: false});

		}).catch(function(err){
			console.log(err);
		});
	},

	GET_ONE_POST: function ({commit}, postData) {
		axios.post(process.env.SERVER_ENV + 'posts/getone', postData).then(function (response) {
			var currentPost = response.data.response.data;
			commit('SET_CURRENT_POST', {currentPost: currentPost});
			commit('SET_LOADING', {flag: false});
		}).catch(function(err){
			console.log(err);
		});
	},

	GET_POSTS_BY_TAG: function ({commit}, postData) {
		axios.post(process.env.SERVER_ENV + 'posts/getbytag', postData).then(function (response) {
			var posts = response.data.response.data.posts;
			commit('SET_ALL_POSTS', {allPosts: posts});
			commit('SET_LOADING', {flag: false});
		}).catch(function(err){
			console.log(err);
		});
	},

	SET_LOADING_ACTION: function ({commit}, flag) {
		commit('SET_LOADING', {flag: flag});
	},
};

const mutations = {
	SET_CURRENT_POST_ID: function (state, {postID}) {
		state.currentPostID = postID;
	},

	SET_ALL_POSTS: function (state, {allPosts}) {
		state.allPosts = allPosts;
	},

	SET_CURRENT_POST: function (state, {currentPost}) {
		state.currentPost = currentPost;
	},

	SET_LOADING: function (state, {flag}) {
		state.loading = flag;
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
