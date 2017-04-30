<template>
  <div class="blog-abs">
  	<el-row>
      <h2 class="blog-title">{{post.post_title}}</h2>
    </el-row>
    <el-row>
      <p class="blog-author">Author: <i>{{post.post_author.username}}</i></p>
    </el-row>
    <el-row class="blog-abstract">
      <div v-html="compiledMarkdown"></div>
    </el-row>
    <el-row class="readmore">
      <router-link :to="{name:'onePost', params:{ id : this.postComputedID}}">Read More</router-link>
    </el-row>
  </div>
</template>

<script>
var marked = require('marked');

export default {
  props: ['post'],
  computed: {
    compiledMarkdown: function () {
      return marked(this.post.post_abstract, { sanitize: true })
    },
    postComputedID: function () {
      // use id + '&&' + title to distinguish different posts
      var idAndTitle = this.post.post_id.toString() + "&&" + this.post.post_title;
      // do Base64 encoding
      var encodedString = new Buffer(idAndTitle).toString('base64');
      return encodedString;
    }
  },
  data() {
    return {

    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>