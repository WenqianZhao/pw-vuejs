<template>
  <li v-if="comment" class="comment-item">
    <div class="comment-by">
      {{comment.commentby.username}}
    </div>
    <div class="text" v-html="compiledMarkdown"></div>
    <div class="like-and-dislike">
      <img class="icon" src="../../assets/images/icon/like.png" @click="like"><span :class="{ like : liked}">{{likes}}</span>
      <img class="icon" src="../../assets/images/icon/dislike.png" @click="dislike"><span :class="{ dislike : disliked}">{{dislikes}}</span>
    </div>
    <div class="reply">
      <el-row>
        <el-col :span="6">
          <a @click="reply"></a>
        </el-col>
      </el-row>
    </div>
    <div class="toggle" :class="{ open }" v-if="comment.replytocomment && comment.replytocomment.length">
      <a @click="open = !open">{{
        open
            ? '[-]'
            : '[+] ' + pluralize(comment.replytocomment.length) + this.$18n.t('comment.collapsed')
      }}</a>
      <ul class="comment-children" v-show="open">
        <comment-component v-for="id in comment.replytocomment" :key="id" :id="id"></comment-component>
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
    comment: function () {
      return this.allComments[this.id];
    }
  },
  props: ['id'],
  data() {
    return {
      open: true,
      liked: false,
      disliked: false,
      likes: 0,
      dislikes: 0,
    };
  },
  methods: {
    pluralize(n) {
      if(this.$i18n.locale === "en") {
        return n + (n === 1 ? ' reply' : ' replies');
      } else if (this.$18n.locale === "cn") {
        return n + "条回复";
      }
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

    },
  },
  watch: {
    allComments: function(val){
      console.log("here");
      console.log(val);
    }
  },
  created() {
    this.likes = this.allComments[this.id].likes;
    this.dislikes = this.allComments[this.id].dislikes;
  }
}
</script>

<style lang="scss">
  @import "~styles/components/comment.scss";
  @import "~styles/css/highlightjs.min.css";
</style>