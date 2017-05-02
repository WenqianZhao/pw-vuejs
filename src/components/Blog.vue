<template>
  <div class="blog" v-loading.fullscreen.lock="loading&&loadingTag" element-loading-text="Loading...">
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
		 					<p>Search For Posts:</p>
							<el-input
							  placeholder="Javascript"
							  icon="search"
							  v-model="searchInput"
							  :on-icon-click="handleIconClick">
							</el-input>
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
  	allTags: 'allTags',
  }),
  data() {
    return {
    	byTag: false,
    	searchInput: '', 	
    };
  },
  methods: {
  	handleIconClick(ev) {
  		// do Base64 encoding
      var encodedString = new Buffer(this.searchInput).toString('base64');
  		this.$router.push({ name: 'blogSearch', params: { content: encodedString }});
  	}
  },
  created() {
  	this.$store.dispatch('SET_LOADING_TAG_ACTION', true);
  	this.$store.dispatch('GET_ALL_TAGS');
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>