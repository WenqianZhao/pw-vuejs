<template>
  <div class="website">
    <div class="nav-bar">
      <el-menu theme="dark" mode="horizontal" @select="handleSelect">
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-menu-item index="1">
              <router-link :to="{name:'home'}" class="link">{{ $t("navbar.Home") }}</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link :to="{name:'allBlogs'}" class="link">{{ $t("navbar.Blog") }}</router-link>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">{{ $t("navbar.Apps") }}</template>
              <el-menu-item index="3-1">{{ $t("navbar.todoList") }}</el-menu-item>
              <el-menu-item index="3-2">{{ $t("navbar.loveSoccor") }}</el-menu-item>
              <el-menu-item index="3-3">{{ $t("navbar.simpleTB") }}</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">
              <router-link :to="{name:'about'}" class="link">{{ $t("navbar.About") }}</router-link>
            </el-menu-item>
            <el-menu-item index="10">
              <router-link :to="{name:'contact'}" class="link">{{ $t("navbar.Contact") }}</router-link>
            </el-menu-item>
            <el-menu-item index="5" v-if="checkPermission() === 1">
              <router-link :to="{name:'admin'}" class="link">{{ $t("navbar.Admin") }}</router-link>
            </el-menu-item>
            <el-submenu index="6">
              <template slot="title">Language</template>
              <el-menu-item index="6-1" @click="setLanguage(1)">English</el-menu-item>
              <el-menu-item index="6-2" @click="setLanguage(2)">中文</el-menu-item>
            </el-submenu>
            <el-menu-item index="7" class="signup" v-if="checkPermission() === 3">
              <router-link :to="{name:'signup'}" class="link">{{ $t("navbar.signup") }}</router-link>
            </el-menu-item>
            <el-menu-item index="9" class="login">
              <div v-if="checkPermission() < 3">
                <el-submenu index="8">
                  <template slot="title">{{ $t("navbar.Welcome") }} {{this.userObj.username}}</template>
                  <el-menu-item index="8-1">
                    <router-link :to="{name:'profile'}" class="link">{{ $t("navbar.Account") }}</router-link>
                  </el-menu-item>
                  <el-menu-item index="8-2">
                    <router-link :to="{name:'logout'}" class="link">{{ $t("navbar.Logout") }}</router-link>
                  </el-menu-item>
                </el-submenu>
              </div>
              <div v-else>
                <router-link :to="{name:'login'}" class="link">{{ $t("navbar.Login") }}</router-link>
              </div>
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
    setLanguage(val) {
      if (val === 1) {
        this.$i18n.locale = 'en';
      } else if (val === 2) {
        this.$i18n.locale = 'cn';
      }
    }
  },
}
</script>

<style lang="scss">
  @import "~styles/app.scss";
</style>