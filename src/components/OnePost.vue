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
              <span v-if="this.collectCurrent" v-on:click="changeCollect">
                <el-tooltip class="item" effect="dark" :content="collectContent" placement="top-start">
                  <i class="el-icon-star-on"></i>
                </el-tooltip>
              </span>
              <span v-else v-on:click="changeCollect">
                <el-tooltip class="item" effect="dark" :content="collectContent" placement="top-start">
                  <i class="el-icon-star-off"></i>
                </el-tooltip>
              </span>
              <span class="icon-number">{{currentPost.collections}}</span>
            </el-col>
            <el-col :span="2">
              <span v-if="this.likeCurrent" v-on:click="changeLike">
                <el-tooltip class="item" effect="dark" :content="likeContent" placement="top-start">
                  <i class="fa fa-heart" aria-hidden="true"></i>
                </el-tooltip>
              </span>
              <span v-else v-on:click="changeLike">
                <el-tooltip class="item" effect="dark" :content="likeContent" placement="top-start">
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
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
          <el-row v-if="this.userObj.role === 'Admin'" class="modify-post">
            <router-link :to="{name:'adminModifyPost', params: { id: this.currentPost.id }}" class="link"><i class="el-icon-edit"></i></router-link>
            <i class="el-icon-delete" @click="deletePost"></i>
            <el-form :inline="true" :model="category" class="create-new-category">
              <el-form-item :label="this.$i18n.t('blog.category.select')">
                <el-select v-model="category.content">
                  <el-option
                    v-for="item in this.allCategories"
                    :key="item.content"
                    :label="item.content"
                    :value="item.content">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onAddSubmit">{{$t('blog.category.add')}}</el-button>
              </el-form-item>
            </el-form>
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
  },
  sanitize: true, 
  breaks: true
});

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
    collectCurrent: function () {
      return this.$store.getters.collectCurrent;
    },
    compiledMarkdown: function () {
      if (this.currentPost) {
        return marked(this.currentPost.content);
      }
    },
    allRootComments: function () {
      return this.$store.getters.allRootComments;
    },
    userObj: function () {
      return this.$store.getters.userObj;
    },
    allCategories: function () {
      return this.$store.getters.allCategories;
    }
  },
  data() {
    return {
      like: false,
      collection: false,
      textarea: "",
      placeholder: this.$i18n.t("blog.onepost.comment.placeholder"),
      postID: "",
      likeContent: this.likeCurrent ? this.$i18n.t("blog.like.cancel") : this.$i18n.t("blog.like.click"),
      collectContent: this.likeCurrent ? this.$i18n.t("blog.collect.cancel") : this.$i18n.t("blog.collect.click"),
      category: {
        content: ''
      }
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
      this.$store.dispatch('GET_ALL_CATEGORIES');
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('SET_COMMENT_LOADING_ACTION', true);
      this.$store.dispatch('GET_ONE_POST', {postID: postID});
      this.$store.dispatch('GET_ALL_COMMENTS_BY_POSTID', {postID: postID});
      setTimeout(() => {
        var flag = this.hasCollected();
        this.$store.dispatch('SET_COLLECTION_CURRENT', flag);
        this.collection = flag;
      }, 600);
    },
    hasCollected: function () {
      if (this.currentPost.collectors && this.userObj) {
        var userEmail = this.userObj.email;
        if (this.currentPost.collectors.some(user => user.email === userEmail)) {
          return true;
        }
      }
      return false;
    },
    changeLike () {
      this.like = !this.like;
      this.likeContent = this.like ? this.$i18n.t("blog.like.cancel") : this.$i18n.t("blog.like.click");
      this.$store.dispatch('UPDATE_POST_WITH_LIKES', {postID: this.currentPost.id, addOneLike: this.like});
    },
    changeCollect () {
      if (!this.userObj || !this.userObj.username) {        
        this.$alert(this.$i18n.t('blog.onepost.loginBeforeCollect'), this.$i18n.t('blog.onepost.info'), {
          confirmButtonText: this.$i18n.t('blog.onepost.confirm'),
          callback: action => {
            if (action == 'confirm') {
              this.$router.push({path: '/login'});
            }
          }
        });
      } else {
        this.collection = !this.collection;
        this.collectContent = this.collection ? this.$i18n.t("blog.collect.cancel") : this.$i18n.t("blog.collect.click");
        this.$store.dispatch('UPDATE_POST_WITH_COLLECTIONS', {postID: this.currentPost.id, addOneCollection: this.collection, email: this.userObj.email});
      }
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
    onAddSubmit () {
      if (this.category.content.length > 0) {
        var postData = {
          postID: this.postID,
          content: this.category.content
        }
        this.$store.dispatch('ADD_POST_TO_CATEGORY', postData).then( (message) => {
          if (message === "success") {
            this.$message({
              message: this.$i18n.t('blog.category.addto.success'),
              type: 'success'
            });
            this.category.content = "";
          } else {
            this.$message({
              message: this.$i18n.t('blog.category.addto.failure'),
              type: 'warn'
            });
          }
        });
      }
    },
    onReset () {
      this.textarea = "";
    },
    deletePost () {
      this.$store.dispatch('DELETE_POST', {postID: this.currentPost.id}).then( (message) => {
        if (message === "success") {
          this.$message({
            message: "Successfully delete the post.",
            type: 'success'
          });
          this.$router.push({path: '/blog/all'});
        } else {
          this.$message({
            message: "Fail to delete the post.",
            type: 'warn'
          });
        }
      });
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
  @import "~styles/css/font-awesome.min.css";
</style>
