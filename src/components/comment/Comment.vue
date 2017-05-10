<template>
  <li v-if="comment" class="comment-item">
    <div class="comment-by">
      {{comment.commentby.username}}
      <span class="created-at">{{$t('comment.commentOn') + " " + comment.createdAt}}</span>
    </div>
    <div class="text" v-html="compiledMarkdown"></div>
    <div class="like-and-dislike">
      <img class="icon" src="../../assets/images/icon/like.png" @click="like"><span :class="{ like : liked}">{{likes}}</span>
      <img class="icon" src="../../assets/images/icon/dislike.png" @click="dislike"><span :class="{ dislike : disliked}">{{dislikes}}</span>
    </div>
    <div class="reply" v-if="userObj.username">
      <el-row>
        <el-col :span="6">
          <a @click="reply">{{$t('comment.reply')}}</a>
        </el-col>
      </el-row>
    </div>
    <div class="reply-box" v-if="replying">
      <el-input
        type="textarea"
        :rows="3"
        :placeholder="placeholder"
        v-model="textarea"
        class="text-input">
      </el-input>
      <el-button type="primary" @click="onSubmit">{{$t('login.Submit')}}</el-button>
      <el-button @click="onCancel">{{$t('comment.cancel')}}</el-button>
    </div>
    <div class="toggle" :class="{ open : open }" v-if="comment.replytocomment && comment.replytocomment.length">
      <a @click="open = !open">{{
        open
            ? '[-]'
            : '[+] ' + pluralize(comment.replytocomment.length) + this.$i18n.t('comment.collapsed')
      }}</a>
      <ul class="comment-children" v-show="open">
        <comment-component v-for="subcomment in comment.replytocomment" :key="subcomment.id" :id="subcomment.id" :postID="postID"></comment-component>
      </ul>
    </div>
  </li>
</template>

<script>
var marked = require('marked');
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
},{ sanitize: true });

export default {
  name: 'CommentComponent',
  computed: {
    compiledMarkdown: function () {
      if(this.comment){
        return marked(this.comment.content);
      }
    },
    allComments: function () {
      return this.$store.getters.allComments;
    },
    userObj: function () {
      return this.$store.getters.userObj;
    },
  },
  props: ['id','postID'],
  data() {
    return {
      open: true,
      liked: false,
      disliked: false,
      replying: false,
      likes: 0,
      dislikes: 0,
      comment: null,
      textarea: "",
      placeholder: this.$i18n.t("blog.onepost.comment.placeholder"),
    };
  },
  methods: {
    pluralize(n) {
      return n + (n === 1 ? this.$i18n.t('comment.reply2') : this.$i18n.t('comment.replies'));
    },
    like() {
      if(this.disliked){
        this.liked = false;
      } else {
        this.liked = !this.liked;
        this.likes = (this.liked ? 1 : -1 ) + this.likes;
        this.$store.dispatch('UPDATE_COMMENT_LIKE', {commentID: this.id, newLikes: this.likes});
      }
    },
    dislike() {
      if(this.liked){
        this.disliked = false;
      } else {
        this.disliked = !this.disliked;
        this.dislikes = (this.disliked ? 1 : -1 ) + this.dislikes;
        this.$store.dispatch('UPDATE_COMMENT_DISLIKE', {commentID: this.id, newDislikes: this.dislikes});
      }
    },
    reply() {
      this.replying = !this.replying;
    },
    onSubmit () {
      var postData = {
        email: this.userObj.email,
        postID: this.postID,
        commentID: this.id,
        content: this.textarea
      };
      this.$store.dispatch('SET_COMMENT_LOADING_ACTION', true);
      this.$store.dispatch('ADD_CHAIN_COMMENT', postData).then( (message) => {
        if (message === "success") {
          this.textarea = "";
          this.replying = false;
          this.$message({
            message: this.$i18n.t('comment.add.success'),
            type: 'success'
          });
          this.$nextTick(function(){
            this.comment = this.allComments[this.id];
          });
        } else {
          this.$message({
            message: this.$i18n.t('comment.add.failure'),
            type: 'warn'
          });
        }
      });
    },
    onCancel () {
      this.replying = false;
      this.textarea = "";
    }
  },
  created() {
    this.likes = this.allComments[this.id].likes;
    this.dislikes = this.allComments[this.id].dislikes;
    this.comment = this.allComments[this.id];
  }
}
</script>

<style lang="scss">
  @import "~styles/components/comment.scss";
  @import "~styles/css/highlightjs.min.css";
</style>