<template>
  <el-row class="login" type="flex" justify="center" align="middle">
    <el-col :span="10">
      <el-row>
        <el-col :span="20">
          <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item :label="this.$i18n.t('login.Email')" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item :label="this.$i18n.t('login.Password')" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('login.Submit')}}</el-button>
              <el-button @click="resetForm('ruleForm')">{{$t('login.Reset')}}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  computed: mapGetters({
    status: 'status'
  }),
  data() {
    return {
      labelPosition: 'right',
      ruleForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: this.$i18n.t("login.checkEmail"), trigger: 'blur' },
          { type: 'email', message: this.$i18n.t("login.checkEmail2"), trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: this.$i18n.t("login.checkPassword"), trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('GET_USER_OBJECT', {
            email: this.ruleForm.email,
            password: this.ruleForm.password
          }).then( (message) => {
            if(message === 'success'){
              this.$notify({
                title: this.$i18n.t("login.cong"),
                message: this.$i18n.t("login.loginSuccess"),
                type: 'success',
                duration: 2000
              });
              this.$router.push({ name: 'home'});
            } else if (message === 'failure') {
              this.$notify({
                title: 'Error',
                message: this.status,
                type: 'warning',
                duration: 2500
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style lang="scss">
  @import "~styles/components/auth.scss";
</style>