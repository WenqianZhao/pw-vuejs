<template>
  <div class="admin-get-all-advices" v-loading.fullscreen.lock="loading" element-loading-text="Loading...">
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row>
          <div class="advice-item" v-for="advice in allAdvices">
            <p>{{$t('contact.name')}}:{{advice.name}}<span style="margin-left: 1em;">{{$t('login.Email')}}:{{advice.email}}</span></p>
            <p v-if="advice.selected == 1">{{$t('contact.advice')}}:</p>
            <p v-else>{{$t('contact.bug')}}:</p>
            <p>{{advice.content}}</p>
            <el-button type="primary" size="small" @click="deleteAdvice(advice.id)">Delete</el-button>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: mapGetters({
    allAdvices: 'allAdvices',
    loading: 'loading',
  }),
  data() {
    return {
      
    };
  },
  methods: {
    deleteAdvice(id) {
      this.$store.dispatch('DELETE_ADVICE', {contactID: id}).then( (message) => {
        if(message === 'success'){
          this.$message({
            message: 'Delete the advice successfully',
            type: 'success'
          });
        } else if (message === 'failure') {
          this.$message({
            message: 'Fail to delete advice',
            type: 'warn'
          });
        }
      });
    }
  },
  created() {
    this.$store.dispatch('SET_LOADING_ACTION', true);
    this.$store.dispatch('GET_ALL_ADVICES');
  }
}
</script>

<style lang="scss">
  @import "~styles/components/admin.scss";
</style>