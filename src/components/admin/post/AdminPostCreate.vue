<template>
  <div class="admin-post-create">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <p class="create">Create a new post</p>
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
          <el-col :span="8" :offset="2">
            <el-form-item label="Tags:" label-width="50px">
              <el-input v-model="post.tags"></el-input>
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
import { mavonEditor } from 'mavon-editor';

export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      value: '',
      lp: 'top',
      post: {
        title: '',
        tags: '',
        abstract: '',
      }
    };
  },
  methods: {
    savePost: function(value, reder) {
      console.log(value);
      console.log(reder);
      var postData = {
        title: this.post.title,
        tags: this.post.tags,
        abstract: this.post.abstract,
        email: 'zhwq11308@gmail.com',
        content: value,
      };
      this.$store.dispatch('CREATE_NEW_POST', postData).then( (retVal) => {
        if(retVal.message === 'success'){
          this.$message({
            message: 'Successfully create a new post.',
            type: 'success'
          });
        } else {
          if(!retVal.message){
            this.$message.error(retVal.message);
          } else {
            this.$message.error('Fail to create a new post.');
          }
        }
        this.$router.push({ name: 'adminPostGetAll'});
      }).catch((err) => {
        this.$message.error(err);
      });
    }
  },
}
</script>

<style lang="scss">
  @import "~styles/components/admin.scss";
</style>