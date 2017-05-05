<template>
  <el-row class="signup" type="flex" justify="center" align="middle">
    <el-col :span="10">
      <el-row>
        <el-col :span="20">
          <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item :label="this.$i18n.t('signup.Username')" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item :label="this.$i18n.t('login.Email')" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item :label="this.$i18n.t('login.Password')" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item :label="this.$i18n.t('signup.cfpassword')" prop="passwordConfirm">
              <el-input v-model="ruleForm.passwordConfirm" type="password"></el-input>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('signup.pwdNotEmpty')));
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$i18n.t('signup.cfpasswordNotEqual')));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      ruleForm: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      rules: {
        username: [
          { required: true, message: this.$i18n.t('signup.piu'), trigger: 'blur' },
          { min: 6, max: 20, message: this.$i18n.t('signup.length'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$i18n.t('signup.pie'), trigger: 'blur' },
          { type: 'email', message: this.$i18n.t('signup.emailInvalid'), trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: this.$i18n.t('signup.pip'), trigger: 'blur' },
          { min: 8, message: this.$i18n.t('signup.pLength'), trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: this.$i18n.t('signup.pCfpassword'), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('SET_USER_OBJECT', {
            username: this.ruleForm.username,
            email: this.ruleForm.email,
            password: this.ruleForm.password
          }).then( (message) => {
            if(message === 'success'){
              this.$notify({
                title: this.$i18n.t("login.cong"),
                message: this.$i18n.t('signup.signupSuccess'),
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