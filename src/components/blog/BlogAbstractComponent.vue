<template>
  <div class="blog-abs">
  	<el-row>
      <h2 class="blog-title"><router-link :to="{name:'onePost', params:{ id : this.postComputedID}}">{{post.post_title}}</router-link></h2>
    </el-row>
    <el-row>
      <p class="blog-author">Author: <i>{{post.post_author.username}}</i></p>
    </el-row>
    <el-row class="blog-abstract">
      <div v-html="compiledMarkdown"></div>
    </el-row>
    <el-row class="readmore">
      <router-link :to="{name:'onePost', params:{ id : this.postComputedID}}">Read More...</router-link>
    </el-row>
    <el-row class="blog-tags" v-if="this.byTag">
      <el-tag v-for="tag in post.post_tags" :key="tag.id">
        <router-link :to="{name:'blogByTag', params:{ name : tag.content}}">{{tag.content}}</router-link>
      </el-tag>
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
  props: ['post','byTag'],
  computed: {
    compiledMarkdown: function () {
      return marked(this.post.post_abstract);
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
  @import "~styles/css/highlightjs.min.css";
</style>