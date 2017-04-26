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
          <el-col :span="6" :offset="2">
            <el-form-item label="Date:">
              <el-date-picker type="date" placeholder="Choose date" v-model="post.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="14">
        <el-form-item label="Tags(seperated by comma):" label-width="200px">
          <el-input v-model="post.tags"></el-input>
        </el-form-item>
        </el-col>
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
      lp: 'left',
      post: {
        title: '',
        date: '',
        tags: ''
      }
    };
  },
  methods: {
    savePost: function(value, reder) {
      console.log(value);
      console.log(reder);
    }
  },
}
</script>

<style lang="scss">
  @import "~styles/components/admin.scss";
</style>