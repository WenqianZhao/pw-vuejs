<template>
  <div class="blog-all">
    <blog-abstract-component 
      v-for="post in allPosts.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
      :key="post.post_id" 
      :post="post"
      :byTag="byTag"
    ></blog-abstract-component>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="this.allPosts.length">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BlogAbstractComponent from './BlogAbstractComponent';
import {mapGetters} from 'vuex';

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
      currentPage: 1,
      pageSize: 8,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    }
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