<template>
  <div class="blog" v-loading.fullscreen.lock="loading&&loadingTag" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="18">
  			<el-row>
					<el-col :span="17" :offset="1">
						<blog-abstract-component 
		  				v-for="post in this.allPosts" 
		  				:key="post.post_id" 
		  				:post="post"
		  				:byTag="byTag"
		  			></blog-abstract-component>
		  		</el-col>
		  		<el-col :span="5" :offset="1" class="tool-bar">
		  			<el-row class="search-bar">

		  			</el-row>
		  			<el-row class="all-tags">
							<el-row>
								<p>Tags:</p>
							</el-row>
							<el-row>
								<el-tag v-for="tag in this.allTags" :key="tag.id" class="tag">
					        <router-link :to="{name:'blogByTag', params:{ name : tag.content}}">{{tag.content}}</router-link>
					      </el-tag>
							</el-row>
		  			</el-row>
		  		</el-col>
  			</el-row>
  		</el-col>
  	</el-row>
  </div>
</template>

<script>
import BlogAbstractComponent from './blog/BlogAbstractComponent';
import {mapGetters, mapActions} from 'vuex';

export default {
  components: {
  	BlogAbstractComponent,
  },
  computed: mapGetters({
  	loading: 'loading',
  	loadingTag: 'loadingTag',
  	allPosts: 'allPosts',
  	allTags: 'allTags',
  }),
  data() {
    return {
    	byTag: false
    };
  },
  methods: {
  	
  },
  created() {
  	this.$store.dispatch('SET_LOADING_ACTION', true);
  	this.$store.dispatch('GET_ALL_POSTS');
  	this.$store.dispatch('SET_LOADING_TAG_ACTION', true);
  	this.$store.dispatch('GET_ALL_TAGS');
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>