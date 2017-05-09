<template>
  <div class="one-post-outer" v-loading.fullscreen.lock="loading&&commentLoading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="16">
  			<div class="one-post" v-if="this.currentPost.author">
          <el-row>
            <h1 class="one-post-title" >{{currentPost.title}}</h1>
          </el-row>
          <el-row>
            <el-col :span="5">
              <p class="one-post-author">{{$t('blog.bac.author')}}<i>{{currentPost.author.username}}</i></p>
            </el-col>
            <el-col :span="6">
              <p class="one-post-time">{{$t('blog.onepost.created')}}<i>{{currentPost.createdAt.split('T')[0]}}</i></p>
            </el-col>
            <el-col :span="4">
              <p class="one-post-time">{{$t('blog.onepost.clicks')}}<i>{{currentPost.clicks}}</i></p>
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
            <h3>{{$t('blog.onepost.comments')}}</h3>
            <div class="comment-textarea" v-if="userObj.username">
              <p>{{userObj.username}}:</p>
              <el-input
                type="textarea"
                :rows="3"
                :placeholder="placeholder"
                v-model="textarea"
                class="text-input">
              </el-input>
              <el-button type="primary" @click="onSubmit">{{$t('login.Submit')}}</el-button>
              <el-button @click="onReset">{{$t('login.Reset')}}</el-button>
            </div>
            <ul class="root-comments" v-if="allRootComments.length">
              <comment-component v-for="comment in allRootComments" :key="comment.id" :id="comment.id" :postID="postID"></comment-component>
            </ul>
            <p v-else>{{$t('blog.onepost.comment.none')}}</p>
          </el-row>
        </div>
  		</el-col>
  	</el-row>
  </div>
</template>

<script>
import CommentComponent from './comment/Comment';

var marked = require('marked');
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
},{ sanitize: true });

export default {
  components: {
    CommentComponent,
  },
  computed: {
    loading: function () {
      return this.$store.getters.loading;
    },
    commentLoading: function () {
      return this.$store.getters.commentLoading;
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
    allRootComments: function () {
      return this.$store.getters.allRootComments;
    },
    userObj: function () {
      return this.$store.getters.userObj;
    },
  },
  data() {
    return {
      textarea: "",
      placeholder: this.$i18n.t("blog.onepost.comment.placeholder"),
      postID: "",
    };
  },
  methods: {
  	fetchOnePost () {
      var encodedString = this.$route.params.id;
      // decode string
      var decodedString = new Buffer(encodedString, 'base64').toString('ascii');
      var postID = decodedString.split('&&')[0];
      this.postID = postID;
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('SET_COMMENT_LOADING_ACTION', true);
      this.$store.dispatch('GET_ONE_POST', {postID: postID});
      this.$store.dispatch('GET_ALL_COMMENTS_BY_POSTID', {postID: postID});
    },
    changeLike () {
      this.like = !this.like;
      this.$store.dispatch('UPDATE_POST_WITH_COLLECTION', {postID: this.currentPost.id, addToCollection: this.like});
    },
    shareTo () {

    },
    onSubmit () {
      var postData = {
        email: this.userObj.email,
        postID: this.postID,
        content: this.textarea
      };
      this.$store.dispatch('SET_COMMENT_LOADING_ACTION', true);
      this.$store.dispatch('ADD_ROOT_COMMENT', postData).then( (message) => {
        if (message === "success") {
          this.$message({
            message: this.$i18n.t('comment.add.success'),
            type: 'success'
          });
          this.textarea = "";
        } else {
          this.$message({
            message: this.$i18n.t('comment.add.failure'),
            type: 'warn'
          });
        }
      });
    },
    onReset () {
      this.textarea = "";
    }
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