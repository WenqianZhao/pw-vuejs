<template>
  <div class="blog-all">
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
</style>