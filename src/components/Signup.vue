<template>
  <el-row class="signup" type="flex" justify="center" align="middle">
    <el-col :span="10">
      <el-row>
        <el-col :span="20">
          <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="Username" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="passwordConfirm">
              <el-input v-model="ruleForm.passwordConfirm"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
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
        callback(new Error('Password should not be empty'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('Please input the same password'));
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
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 6, max: 20, message: 'Length should be more than 6 chars and less than 20 chars.', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input your email address', trigger: 'blur' },
          { type: 'email', message: 'Please input the valid email', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: 'Please input your password', trigger: 'blur' },
          { min: 8, message: 'Length should be more than 8 chars.', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: 'Please confirm your password', trigger: 'blur' },
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
                title: 'Congratulations',
                message: 'Sign up successfully!',
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