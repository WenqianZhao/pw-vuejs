<template>
  <div class="blog-search">
    <el-row v-if="this.findPosts">
      <el-row>
        <p>{{$t('blog.onsearch', {search: searchContent})}}</p>
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
      var searchStr = this.$route.params.content;
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('SEARCH_POSTS', { searchStr : searchStr}).then( (message) => {
        if(message === 'success'){
          this.findPosts = true;
          this.searchContent = searchStr;
        } else {
          this.findPosts = false;
          var currLocale = this.$i18n.locale;
          if(currLocale === 'cn') {
            this.failureMessage = message.cn;
          } else {
            this.failureMessage = message.en;
          }
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