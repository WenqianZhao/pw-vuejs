<template>
  <div class="blog-by-tag">
    <el-row>
      <p>{{$t('blog.bytag', {tag: currentTag})}}</p>
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
      byTag: true,
      currentTag: this.$route.params.name,
    };
  },
  methods: {
  	fetchPostsByTag () {
      var tag = this.$route.params.name;
      this.currentTag = tag;
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