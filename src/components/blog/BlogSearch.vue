<template>
  <div class="blog" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="18">
  			<el-row>
					<el-col :span="17" :offset="1">
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
		  		</el-col>
		  		<el-col :span="5" :offset="1">
		  		</el-col>
  			</el-row>
  		</el-col>
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
          this.failureMessage = message;
        }
        this.$store.dispatch('SET_LOADING_ACTION', false);
      });
    }
  },
  watch: {
    '$route': 'fetchPostsByTag'
  },
  created() {
  	this.searchPosts();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>