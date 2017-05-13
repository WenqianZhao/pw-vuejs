<template>
  <div class="admin">
    <el-row>
      <el-col :span="4">
        <el-menu class="admin-menu">
          <el-submenu index="1">
            <template slot="title">Posts</template>
            <el-menu-item index="1-1">
              <router-link :to="{name:'adminPostCreate'}" class="link">Create a post</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{name:'adminPostGetAll'}" class="link">Get all posts</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="2">Users</el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{name:'adminGetAllAdvices'}" class="link">Advices</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss">
  @import "~styles/components/admin.scss";
</style>