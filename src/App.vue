<template>
  <div class="website">
    <div class="nav-bar">
      <el-menu class="el-menu-demo" theme="dark" mode="horizontal" @select="handleSelect">
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-menu-item index="1">
              <router-link :to="{name:'home'}" class="link">Home</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link :to="{name:'blog'}" class="link">Blog</router-link>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">Apps</template>
              <el-menu-item index="3-1">ToDoList App</el-menu-item>
              <el-menu-item index="3-2">Love Soccer</el-menu-item>
              <el-menu-item index="3-3">Simple taobao</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">
              <router-link :to="{name:'about'}" class="link">About</router-link>
            </el-menu-item>
            <el-menu-item index="5" v-if="checkPermission() === 1">
              <router-link :to="{name:'admin'}" class="link">Admin</router-link>
            </el-menu-item>
            <el-menu-item index="6" class="signup">
              <router-link :to="{name:'signup'}" class="link">Sign Up</router-link>
            </el-menu-item>
            <el-menu-item index="7" class="login">
              <router-link :to="{name:'logout'}" class="link" v-if="checkPermission() < 3">Logout</router-link>
              <router-link :to="{name:'login'}" class="link" v-else>Login</router-link>
            </el-menu-item>
          </el-col>
        </el-row>
      </el-menu>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import jwt from 'jsonwebtoken';

var localConfig = require('../config/local.js');
var secret = localConfig.secret;

export default {
  computed: mapGetters({
    token: 'token',
    userObj: 'userObj'
  }),
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    checkPermission() {
      if(this.userObj){
        if(this.userObj.role === 'Admin'){
          return 1;
        }else if(this.userObj.role === 'NormalUser'){
          return 2;
        }
      }
      return 3;
    },
  },
}
</script>

<style lang="scss">
  @import "~styles/app.scss";
</style>