<template>
  <li v-if="comment" class="comment-item">
    <div class="comment-by">
      {{comment.commentby.username}}
    </div>
    <div class="text" v-html="compiledMarkdown"></div>
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
    };
  },
  methods: {
    pluralize(n) {
      if(this.$i18n.locale === "en") {
        return n + (n === 1 ? ' reply' : ' replies');
      } else if (this.$18n.locale === "cn") {
        return n + "条回复";
      }
    }
  },
  created() {

  }
}
</script>

<style lang="scss">
  @import "~styles/components/comment.scss";
  @import "~styles/css/highlightjs.min.css";
</style>