<template>
  <div class="account" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="18">
  			<el-row>
          <el-col :span="5" :offset="1">
            <ul class="vertical-nav-bar">
              <li><router-link :to="{name:'profile'}" class="link">Profile</router-link></li>
              <li><router-link :to="{name:'changePassword'}" class="link">Change Password</router-link></li>
              <li><router-link :to="{name:'userCollection'}" class="link">Collection</router-link></li>
            </ul>
          </el-col>
					<el-col :span="17" :offset="1">
						<div>
              <router-view></router-view>
            </div>
		  		</el-col>
  			</el-row>
  		</el-col>
  	</el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: mapGetters({
  	loading: 'loading',
  }),
  data() {
    return {
	
    };
  },
  methods: {

  },
  created() {

  }
}
</script>

<style lang="scss">
  @import "~styles/components/user.scss";
</style>