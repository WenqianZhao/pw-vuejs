<template>
  <div class="one-post-outer" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="16">
  			<div class="one-post" v-if="this.currentPost.author">
          <el-row>
            <h1 class="one-post-title" >{{currentPost.title}}</h1>
          </el-row>
          <el-row>
            <el-col :span="5">
              <p class="one-post-author">Author: <i>{{currentPost.author.username}}</i></p>
            </el-col>
            <el-col :span="6">
              <p class="one-post-time">Created At: <i>{{currentPost.createdAt.split('T')[0]}}</i></p>
            </el-col>
            <el-col :span="4">
              <p class="one-post-time">Clicks: <i>{{currentPost.clicks}}</i></p>
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
          <el-row class="post-icons">
            <el-col :span="2">
              <span v-if="this.likeCurrent" v-on:click="changeLike">
                <el-tooltip class="item" effect="dark" content="Click to cancel collection" placement="top-start">
                  <i class="el-icon-star-on"></i>
                </el-tooltip>
              </span>
              <span v-else v-on:click="changeLike">
                <el-tooltip class="item" effect="dark" content="Click to collect" placement="top-start">
                  <i class="el-icon-star-off"></i>
                </el-tooltip>
              </span>
              <span class="icon-number">{{currentPost.likes}}</span>
            </el-col>
            <el-col :span="2">
              <span v-on:click="shareTo">
                <el-tooltip class="item" effect="dark" content="Click to share" placement="top-start">
                  <i class="el-icon-share"></i>
                </el-tooltip>
              </span>
              <span class="icon-number">{{currentPost.reposts}}</span>
            </el-col>
          </el-row>
          <el-row class="post-comments">
            <h3>Comments:</h3>

          </el-row>
        </div>
  		</el-col>
  	</el-row>
  </div>
</template>

<script>
var marked = require('marked');
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
},{ sanitize: true });

export default {
  computed: {
    loading: function () {
      return this.$store.getters.loading;
    },
    currentPost: function () {
      return this.$store.getters.currentPost;
    },
    likeCurrent: function () {
      return this.$store.getters.likeCurrent;
    },
    compiledMarkdown: function () {
      if(this.currentPost){
        return marked(this.currentPost.content);
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
    },
    changeLike () {
      this.like = !this.like;
      this.$store.dispatch('UPDATE_POST_WITH_COLLECTION', {postID: this.currentPost.id, addToCollection: this.like});
    },
    shareTo () {

    },
  },
  watch: {
    '$route': 'fetchOnePost',
  },
  created() {
  	this.fetchOnePost();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
  @import "~styles/css/highlightjs.min.css";
</style>