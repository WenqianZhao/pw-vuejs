<template>
  <div class="blog" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="18">
  			<el-row>
					<el-col :span="17" :offset="1">
						<div>
              <router-view></router-view>
            </div>
		  		</el-col>
		  		<el-col :span="5" :offset="1" class="tool-bar">
		  			<el-row class="search-bar">
		 					<p>{{$t('blog.search')}}</p>
							<el-input
							  placeholder="Javascript"
							  icon="search"
							  v-model="searchInput"
							  :on-icon-click="handleIconClick">
							</el-input>
		  			</el-row>
		  			<el-row class="all-tags">
							<el-row>
								<p>{{$t('blog.tags')}}</p>
							</el-row>
							<el-row>
								<el-tag v-for="tag in this.allTags" :key="tag.id" class="tag">
					        <router-link :to="{name:'blogByTag', params:{ name : tag.content}}">{{tag.content}}</router-link>
					      </el-tag>
							</el-row>
		  			</el-row>
            <el-row class="top-posts">
              <p class="top-title">{{$t('blog.top')}}</p>
              <p v-for="(post, index) in this.topPosts" :key="post.post_id" class="top-posts-p">{{index+1}}.
                <router-link :to="{name:'onePost', params:{ id : postComputedID(post.post_id, post.post_title)}}">{{post.post_title}}</router-link>
              </p>
              <p class="top-posts-clicks">{{$t('blog.clicks')}}{{post.post_clicks}}</p>
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
    loadingTopPosts: 'loadingTopPosts',
  	allTags: 'allTags',
    topPosts: 'topPosts',
  }),
  data() {
    return {
    	byTag: false,
    	searchInput: '', 	
    };
  },
  methods: {
  	handleIconClick (ev) {
      this.$router.push({ name: 'blogSearch', params: { content: this.searchInput }});
  	},
    postComputedID (post_id, post_title) {
      // use id + '&&' + title to distinguish different posts
      var idAndTitle = post_id.toString() + "&&" + post_title;
      // do Base64 encoding
      var encodedString = new Buffer(idAndTitle).toString('base64');
      return encodedString;
    }
  },
  created() {
  	this.$store.dispatch('SET_LOADING_TAG_ACTION', true);
    this.$store.dispatch('SET_LOADING_TOP_POSTS_ACTION', true);
  	this.$store.dispatch('GET_ALL_TAGS');
    this.$store.dispatch('GET_TOP_POSTS');
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>