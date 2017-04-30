<template>
  <div class="one-post-outer" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="16">
  			<div class="one-post" v-if="this.currentPost.author">
          <el-row>
            <h1 class="one-post-title" >{{currentPost.title}}</h1>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p class="one-post-author">Author: <i>{{currentPost.author.username}}</i></p>
            </el-col>
            <el-col :span="6">
              <p class="one-post-time">Created At: <i>{{currentPost.createdAt.split('T')[0]}}</i></p>
            </el-col>
          </el-row>
          <el-row class="one-post-content">
            <div v-html="compiledMarkdown"></div>
          </el-row>
          <el-row class="post-tag">
            <el-tag v-for="tag in currentPost.tags" :key="tag.id">
              <router-link :to="{name:'blogByTag', params:{ name : tag.content}}">{{tag.content}}</router-link>
            </el-tag>
          </el-row>
          <el-row>
            <h3>Comments:</h3>

          </el-row>
        </div>
  		</el-col>
  	</el-row>
  </div>
</template>

<script>
var marked = require('marked');

export default {
  computed: {
    loading: function () {
      return this.$store.getters.loading;
    },
    currentPost: function () {
      return this.$store.getters.currentPost;
    },
    compiledMarkdown: function () {
      if(this.currentPost){
        console.log(this.currentPost);
        return marked(this.currentPost.content, { sanitize: true });
      }
    },
  },
  data() {
    return {
    };
  },
  methods: {
  	fetchOnePost () {
      var encodedString = this.$route.params.id;
      // decode string
      var decodedString = new Buffer(encodedString, 'base64').toString('ascii');
      var postID = decodedString.split('&&')[0];
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('GET_ONE_POST', {postID: postID});
    }
  },
  watch: {
    '$route': 'fetchOnePost'
  },
  created() {
  	this.fetchOnePost();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>