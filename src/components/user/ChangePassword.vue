<template>
  <div class="change-password">
  	<p>{{$t('account.changePassword.oldpwd')}}<input name="oldpassword" type="password" v-model="oldpassword"></p>
    <p>{{$t('account.changePassword.newpwd')}}<input name="newpassword" type="password" v-model="newpassword"></p>
    <p>{{$t('account.changePassword.confirmnewpwd')}}<input name="confirmNewpassword" type="password" v-model="confirmNewpassword"></p>
    <el-button type="primary" @click="onSubmit">{{$t('account.profile.button.Submit')}}</el-button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: mapGetters({
    userObj: 'userObj',
  }),
  data() {
    return {
      oldpassword: "",
      newpassword: "",
      confirmNewpassword: "",
    };
  },
  methods: {
    onSubmit () {
      if (this.checkPassword(this.newpassword, this.confirmNewpassword)) {
        var postData = {
          email: this.userObj.email,
          oldpassword: this.oldpassword,
          newpassword: this.newpassword
        };
        this.$store.dispatch('CHANGE_PASSWORD', postData)
        .then( (message) => {
          if(message === 'success'){
            this.$message({
              message: this.$i18n.t('account.changePassword.success'),
              type: 'success'
            });
          } else if (message === 'failure') {
            this.$message({
              message: this.$i18n.t('account.changePassword.warn'),
              type: 'warning'
            });
          }
        });
      }
    },
    checkPassword (pwd1, pwd2) {
      if (pwd1 === pwd2) {
        if (pwd1.length < 8) {
          this.$message({
            message: this.$i18n.t('signup.pLength'),
            type: 'warning'
          });
          return false;
        }
        return true;
      } else {
        this.$message({
          message: this.$i18n.t('signup.pCfpassword'),
          type: 'warning'
        });
        return false;
      }
    }
  },
  created() {

  }
}
</script>

<style lang="scss">
  @import "~styles/components/user.scss";
</style>