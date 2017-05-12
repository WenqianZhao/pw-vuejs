<template>
  <div class="profile">
    <div class="profile-content">
      <p>{{$t('account.profile.Username')}}: {{this.userObj.username}}</p>
      <p>{{$t('account.profile.Email')}}: {{this.userObj.email}}</p>
      <p>{{$t('account.profile.Role')}}: {{this.userObj.role}}</p>
      <p v-if="modifying === true">{{$t('account.profile.Firstname')}}: <input name="firstname" type="text" v-model="formData.firstname"></p>
      <p v-else>{{$t('account.profile.Firstname')}}: {{this.userObj.firstname}}</p>
      <p v-if="modifying === true">{{$t('account.profile.Lastname')}}: <input name="lastname" type="text" v-model="formData.lastname"></p>
      <p v-else>{{$t('account.profile.Lastname')}}: {{this.userObj.lastname}}</p>
      <p v-if="modifying === true">{{$t('account.profile.Age')}}: <input name="age" type="text" v-model="formData.age"></p>
      <p v-else>{{$t('account.profile.Age')}}: {{this.userObj.age}}</p>
      <p v-if="modifying === true">{{$t('account.profile.Gender')}}: 
        <el-radio-group v-model="formData.gender">
          <el-radio :label="1">{{$t('account.profile.gender.Male')}}</el-radio>
          <el-radio :label="2">{{$t('account.profile.gender.Female')}}</el-radio>
          <el-radio :label="3">{{$t('account.profile.gender.Secret')}}</el-radio>
        </el-radio-group>
      </p>
      <p v-else>{{$t('account.profile.Gender')}}: {{this.getGender(this.userObj.gender)}}</p>
    </div>
    <div class="buttons">
      <div v-if="modifying === true">
        <el-button type="primary" @click="onSubmit">{{$t('account.profile.button.Submit')}}</el-button>
        <el-button @click="onCancel">{{$t('account.profile.button.Cancel')}}</el-button>
      </div>
      <div v-else >
        <el-button type="primary" @click="modify">{{$t('account.profile.button.Modify')}}</el-button>
      </div>
    </div>
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
      modifying: false,
      formData: {
        firstname: "",
        lastname: "",
        age: "",
        gender: ""
      }
    };
  },
  methods: {
    getGender (val) {
      if (val === 1) {
        return this.$i18n.t('account.profile.gender.Male');
      } else if (val === 2) {
        return this.$i18n.t('account.profile.gender.Female');
      } else if (val === 3){
        return this.$i18n.t('account.profile.gender.Secret');
      } else {
        return null;
      }
    },
    modify () {
      this.modifying = true;
    },
    onSubmit () {
      if(this.varifyFormData(this.formData)){
        let postData = {
          email: this.userObj.email,
          firstname: this.formData.firstname,
          lastname: this.formData.lastname,
          age: this.formData.age,
          gender: this.formData.gender
        };
        this.$store.dispatch('MODIFY_PERSONAL_INFO', postData)
        .then( (message) => {
          if(message === 'success'){
            this.$message({
              message: this.$i18n.t('account.profile.success'),
              type: 'success'
            });
            this.modifying = false;
          } else if (message === 'failure') {
            this.$message({
              message: this.$i18n.t('account.profile.warn.message'),
              type: 'warning'
            });
          }
        });
      }
    },
    onCancel () {
      this.modifying = false;
    },
    varifyFormData (formData) {
      var patternForName = /^([a-zA-Z]+|[\u4E00-\u9FA5\uF900-\uFA2D]+)$/g;
      var age = parseInt(formData.age);
      if(formData.firstname && !formData.firstname.match(patternForName)){
        this.$message({
          message: this.$i18n.t('account.profile.warn.Firstname'),
          type: 'warning'
        });
        return false;
      } else if (formData.lastname && !formData.lastname.match(patternForName)) {
        this.$message({
          message: this.$i18n.t('account.profile.warn.Lastname'),
          type: 'warning'
        });
        return false;
      } else if (age < 0 || age > 150) {
        this.$message({
          message: this.$i18n.t('account.profile.warn.Age'),
          type: 'warning'
        });
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.formData.firstname = this.userObj.firstname;
    this.formData.lastname = this.userObj.lastname;
    this.formData.age = this.userObj.age;
    this.formData.gender = this.userObj.gender;
  }
}
</script>

<style lang="scss">
  @import "~styles/components/user.scss";
</style>