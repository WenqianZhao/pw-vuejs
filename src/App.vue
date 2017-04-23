<template>
  <div>
    <div class="nav-bar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" theme="dark" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <router-link :to="{name:'home'}" class="link">Home</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          Blog
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">Apps</template>
          <el-menu-item index="3-1">ToDoList App</el-menu-item>
          <el-menu-item index="3-2">Love Soccer</el-menu-item>
          <el-menu-item index="3-3">Simple taobao</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <router-link :to="{name:'admin'}" v-if="checkAdmin()" class="link">Admin</router-link>
        </el-menu-item>
        <el-menu-item index="5" class="signup">
          <router-link :to="{name:'signup'}" class="link">Sign Up</router-link>
        </el-menu-item>
        <el-menu-item index="6" class="login">
          <router-link :to="{name:'login'}" class="link">Login</router-link>
        </el-menu-item>      
      </el-menu>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import tokenService from './mixins/tokenService';

export default {
  computed: mapGetters({
    token: 'token'
  }),
  data() {
    return {
      activeIndex: '1',
    };
  },
  mixins: [tokenService],
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    checkAdmin() {
      var tokenInStorage = window.localStorage.getItem('token');
      if (this.token !== "" || tokenInStorage !== "") {
        var currToken = (this.token !== "") ? this.token : tokenInStorage;
        // verify token
        var verifiedToken = this.verifyToken(currToken);
        // if (!verifiedToken.isErr) {
        //   if (verifiedToken.decoded.role === "Admin") {
        //     return true;
        //   }
        // }
      }
      return false;
    },
  },
}
</script>

<style lang="scss">
  @import "~styles/app.scss";
</style>