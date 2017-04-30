<template>
  <div class="blog" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="18">
  			<el-row>
					<el-col :span="18" :offset="1">
						<blog-abstract-component 
		  				v-for="post in this.allPosts" 
		  				:key="post.post_id" 
		  				:post="post"
		  			></blog-abstract-component>
		  		</el-col>
		  		<el-col :span="5">
		  		</el-col>
  			</el-row>
  		</el-col>
  	</el-row>
  </div>
</template>

<script>
import BlogAbstractComponent from '../../blog/BlogAbstractComponent';
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
    };
  },
  methods: {
  	
  },
  created() {
  	this.$store.dispatch('SET_LOADING_ACTION', true);
  	this.$store.dispatch('GET_ALL_POSTS');
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
  @import "~styles/components/admin.scss";
</style>