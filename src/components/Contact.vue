<template>
  <el-row class="contact" type="flex" justify="center" align="middle">
    <el-col :span="10">
      <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item :label="this.$i18n.t('login.Email')" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="this.$i18n.t('contact.name')" prop="name">
          <el-input v-model="ruleForm.name" type="name"></el-input>
        </el-form-item>
        <el-form-item :label="this.$i18n.t('contact.adviceOrBug')" prop="selected">
          <el-radio-group v-model="ruleForm.selected">
            <el-radio label="1">{{$t('contact.advice')}}</el-radio>
            <el-radio label="2">{{$t('contact.bug')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="this.$i18n.t('contact.content')" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button class="button" type="primary" @click="submitForm('ruleForm')">{{$t('login.Submit')}}</el-button>
          <el-button class="button"  @click="resetForm('ruleForm')">{{$t('login.Reset')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        email: '',
        name: '',
        selected: '1',
        content: '',
      },
      rules: {
        email: [
          { required: true, message: this.$i18n.t("login.checkEmail"), trigger: 'blur' },
          { type: 'email', message: this.$i18n.t("login.checkEmail2"), trigger: 'blur,change' }
        ],
        name: [
          { required: true, message: this.$i18n.t("contact.checkName"), trigger: 'blur' },
        ],
        selected: [
          { required: true, message: this.$i18n.t("contact.checkSelect"), trigger: 'change' },
        ],
        content: [
          { required: true, message: this.$i18n.t("contact.checkContent"), trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('SUBMIT_ADVICE', {
            email: this.ruleForm.email,
            name: this.ruleForm.name,
            selected: this.ruleForm.selected,
            content: this.ruleForm.content
          }).then( (message) => {
            if(message === 'success'){
              this.$message({
                message: this.$i18n.t("contact.thanks"),
                type: 'success'
              });
              this.resetForm(formName);
            } else if (message === 'failure') {
              this.$message({
                message: this.$i18n.t("contact.error"),
                type: 'warn'
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
  @import "~styles/components/contact.scss";
</style>