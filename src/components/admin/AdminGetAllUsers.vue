<template>
  <div class="admin-users">
    <el-table
    :data="allUsers"
    stripe
    style="width: 800">
      <el-table-column
        prop="username"
        label="用户名"
        width="250">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="250">
      </el-table-column>
      <el-table-column
        prop="isActive"
        label="状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="role"
        label="身份">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: mapGetters({
    allUsers: 'allUsers',
    loading: 'loading',
  }),
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  created() {
    this.$store.dispatch('SET_LOADING_ACTION', true);
    this.$store.dispatch('GET_ALL_USERS');
  }
}
</script>

<style lang="scss">
  @import "~styles/components/admin.scss";
</style>