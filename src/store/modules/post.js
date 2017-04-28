import axios from 'axios';

const state = {
	currentPostID: null
};

const getters = {
	currentPostID: state => state.currentPostID 
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
					resolve('success');
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
					resolve(status);
				}
			});
		});
	},
};

const mutations = {
	SET_CURRENT_POST_ID: function (state, {postID}) {
		state.currentPostID = postID;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
