<template>
  <div class="blog-by-category">
    <el-row>
      <p>{{$t('blog.bycategory', {category: currentCategory})}}</p>
    </el-row>
		<blog-abstract-component 
			v-for="post in this.allPosts" 
			:key="post.post_id" 
			:post="post"
      :byTag="byTag"
		></blog-abstract-component>
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
      currentCategory: this.$route.params.name,
    };
  },
  methods: {
  	fetchPostsByCategory () {
      var category = this.$route.params.name;
      this.currentCategory = category;
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('GET_POSTS_BY_CATEGORY', { content : category});
    }
  },
  watch: {
    '$route': 'fetchPostsByCategory'
  },
  created() {
  	this.fetchPostsByCategory();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/blog.scss";
</style>