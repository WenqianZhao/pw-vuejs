<template>
  <div class="admin-post-modify">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <p class="modify">Modify a post</p>
      </el-col>
    </el-row>
    <el-row>
      <el-form :label-position="lp" :model="post" label-width="50px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="Title:">
              <el-input placeholder="title" v-model="post.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <p>Abstract:</p>
            <el-input type="textarea" v-model="post.abstract"></el-input>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <p>Content:</p>
      <mavonEditor :value="value" @save="savePost" />
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { mavonEditor } from 'mavon-editor';

export default {
  computed: mapGetters({
    currentPost: 'currentPost'
  }),
  components: {
    mavonEditor
  },
  data() {
    return {
      value: '',
      lp: 'top',
      post: {
        title: '',
        abstract: '',
      }
    };
  },
  methods: {
    fetchOnePost () {
      var postID = this.$route.params.id;
      this.$store.dispatch('SET_LOADING_ACTION', true);
      this.$store.dispatch('GET_ONE_POST', {postID: postID});
      setTimeout(() => {
        this.value = this.currentPost.content;
        this.post.title = this.currentPost.title;
        this.post.abstract = this.currentPost.abstract;
      }, 300);
    },
    savePost: function(value, reder) {
      console.log(value);
      console.log(reder);
      var postData = {
        id: this.currentPost.id,
        title: this.post.title,
        abstract: this.post.abstract,
        content: value,
      };
      this.$store.dispatch('MODIFY_ONE_POST', postData).then( (message) => {
        if(message === 'success'){
          this.$message({
            message: 'Successfully modify a new post.',
            type: 'success'
          });
        } else {
          this.$message.error('Fail to modify a new post.');
        }
        this.$router.push({ name: 'adminPostGetAll'});
      }).catch((err) => {
        this.$message.error(err);
      });
    }
  },
  watch: {
    '$route': 'fetchOnePost',
  },
  created() {
    this.fetchOnePost();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/admin.scss";
</style>