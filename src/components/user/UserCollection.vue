<template>
  <div class="user-collection" v-loading.body="loading">
  	<blog-abstract-component 
      v-for="post in this.allPosts" 
      :key="post.post_id" 
      :post="post"
      :byTag="byTag"
    ></blog-abstract-component>
  </div>
</template>

<script>
import BlogAbstractComponent from '../blog/BlogAbstractComponent';
import {mapGetters} from 'vuex';

export default {
  components: {
    BlogAbstractComponent,
  },
  computed: mapGetters({
    loading: 'loading',
    allPosts: 'allPosts',
    userObj: 'userObj',
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
    this.$store.dispatch('GET_ALL_COLLECTIONS', {email: this.userObj.email});
  }
}
</script>

<style lang="scss">
  @import "~styles/components/user.scss";
</style>