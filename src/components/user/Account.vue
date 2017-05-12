<template>
  <div class="account" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
  	<el-row type="flex" justify="center">
  		<el-col :span="18">
  			<el-row>
          <el-col :span="5" :offset="1">
            <ul class="vertical-nav-bar">
              <li class="nav-item"><router-link :to="{name:'profile'}" class="link">{{$t('account.Profile')}}</router-link></li>
              <li class="nav-item"><router-link :to="{name:'changePassword'}" class="link">{{$t('account.cp')}}</router-link></li>
              <li class="nav-item"><router-link :to="{name:'userCollection'}" class="link">{{$t('account.Collection')}}</router-link></li>
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