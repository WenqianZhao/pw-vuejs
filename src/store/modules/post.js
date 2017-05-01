import axios from 'axios';

const state = {
	currentPostID: null,
	currentPost: {},
	allPosts: [],
	allTags: [],
	loading: false,
	loadingTag: false,
	likeCurrent: false,
};

const getters = {
	currentPostID: state => state.currentPostID,
	currentPost: state => state.currentPost,
	allPosts: state => state.allPosts,
	allTags: state => state.allTags,
	loading: state => state.loading,
	loadingTag: state => state.loadingTag,
	likeCurrent: state => state.likeCurrent,
};

const actions = {
	CREATE_NEW_POST: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			var data = {};
			axios.post(process.env.SERVER_ENV + 'posts/create', postData).then(function (response) {

				// If post is successfully created
				if (response.data.response.status_code === 1512) {
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

	SEARCH_POSTS: function ({commit}, postData) {
		return new Promise( (resolve, reject) => {
			axios.post(process.env.SERVER_ENV + 'posts/search', postData).then(function (response) {
				// If We get the matched posts
				if (response.data.response.status_code === 1520) {
					commit('SET_ALL_POSTS', {allPosts: response.data.response.data});
					resolve('success');
				} else {
					var status = "";
					switch (response.data.response.status_code) {
						case 1519:
							status = "No posts matched.";
							break;
						default:
							status = "Error occurs when searching for posts.";
					};
					resolve(status);
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

	GET_ALL_TAGS: function ({commit}) {
		axios.get(process.env.SERVER_ENV + 'tags/getall').then(function (response) {
			var postData = response.data.response.data;
			commit('SET_ALL_TAGS', {allTags: postData});
			commit('SET_LOADING_TAG', {flag: false});
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

	UPDATE_POST_WITH_COLLECTION: function ({commit,state}, postData) {
		axios.post(process.env.SERVER_ENV + 'posts/updatecollection', postData).then(function (response) {
			var updatedPost = response.data.response.data;
			commit('UPDATE_CURRENT_POST', {currentPost: updatedPost});
			commit('UPDATE_LIKE_CURRETN', postData);
		}).catch(function(err){
			console.log(err);
		});
	},

	SET_LOADING_ACTION: function ({commit}, flag) {
		commit('SET_LOADING', {flag: flag});
	},

	SET_LOADING_TAG_ACTION: function ({commit}, flag) {
		commit('SET_LOADING_TAG', {flag: flag});
	},
};

const mutations = {
	SET_CURRENT_POST_ID: function (state, {postID}) {
		state.currentPostID = postID;
	},

	SET_ALL_POSTS: function (state, {allPosts}) {
		state.allPosts = allPosts;
	},

	SET_ALL_TAGS: function (state, {allTags}) {
		state.allTags = allTags;
	},

	SET_CURRENT_POST: function (state, {currentPost}) {
		state.currentPost = currentPost;
	},

	UPDATE_CURRENT_POST: function (state, {currentPost}) {
		state.currentPost.likes = currentPost.likes;
	},

	UPDATE_LIKE_CURRETN: function (state, {addToCollection}) {
		state.likeCurrent = addToCollection;
	},

	SET_LOADING: function (state, {flag}) {
		state.loading = flag;
	},

	SET_LOADING_TAG: function (state, {flag}) {
		state.loadingTag = flag;
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
