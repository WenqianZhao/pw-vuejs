<template>
  <div class="blog-search">
    <el-row v-if="this.findPosts">
      <el-row>
        <p>Here are the posts that contains "<i>{{searchContent}}</i> ":</p>
      </el-row>
			<blog-abstract-component 
				v-for="post in this.allPosts" 
				:key="post.post_id" 
				:post="post"
        :byTag="byTag"
			></blog-abstract-component>
    </el-row>
    <el-row v-else>
      <i>{{failureMessage}}</i>
    </el-row>
  </div>
</template>

<script>
import BlogAbstractComponent from './BlogAbstractComponent';
import {mapGetters, mapActions} from 'vuex';

export default {
  components: {
  	BlogAbstractComponent,
  },
  computed: mapGetters({
  	loading: 'loading',
  	allPosts: 'allPosts',
  }),
  data() {
    return {
      byTag: false,
      searchContent: '',
      findPosts: false,
      failureMessage: '',
    };
  },
  methods: {
  	searchPosts () {
      var encodedString = this.$route.params.content;
      // decode string
      var searchStr = new Buffer(encodedString, 'base64').toString('ascii');
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('SEARCH_POSTS', { searchStr : searchStr}).then( (message) => {
        if(message === 'success'){
          this.findPosts = true;
          this.searchContent = searchStr;
        } else {
          this.findPosts = false;
          this.failureMessage = message;
        }
        this.$store.dispatch('SET_LOADING_ACTION', false);
      });
    }
  },
  watch: {
    '$route': 'searchPosts'
  },
  created() {
  	this.searchPosts();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>