<template>
  <div class="nav-bar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Blog</el-menu-item>
      <el-submenu index="3">
        <template slot="title">Apps</template>
        <el-menu-item index="3-1">ToDoList App</el-menu-item>
        <el-menu-item index="3-2">Love Soccer</el-menu-item>
        <el-menu-item index="3-3">Simple taobao</el-menu-item>
      </el-submenu>
      <el-menu-item index="4" class="signup">SignUp</el-menu-item>
      <el-menu-item index="5" class="login">Login</el-menu-item>      
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
}
</script>

<style lang="scss">
  @import "~styles/app.scss";
</style>