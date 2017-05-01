<template>
  <div class="blog" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="18">
  			<el-row>
					<el-col :span="17" :offset="1">
            <el-row>
              <p>Here are the posts with tag " <i>{{currentTag}}</i> ":</p>
            </el-row>
						<blog-abstract-component 
		  				v-for="post in this.allPosts" 
		  				:key="post.post_id" 
		  				:post="post"
              :byTag="byTag"
		  			></blog-abstract-component>
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
      byTag: true,
      currentTag: this.$route.params.name,
    };
  },
  methods: {
  	fetchPostsByTag () {
      var tag = this.$route.params.name;
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('GET_POSTS_BY_TAG', { tag : tag});
    }
  },
  watch: {
    '$route': 'fetchPostsByTag'
  },
  created() {
  	this.fetchPostsByTag();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>