<template>
  <div class="admin-categories">
    <el-table
    :data="allCategories"
    stripe
    style="width: 800">
      <el-table-column
        prop="content"
        label="Category"
        width="500">
      </el-table-column>
      <el-table-column
        prop="numberofposts"
        label="Number Of Posts">
      </el-table-column>
    </el-table>
    <p>{{$t('blog.category.create')}}</p>
    <el-form :inline="true" :model="newCategory" class="create-new-category">
      <el-form-item :label="this.$i18n.t('blog.category.content')">
        <el-input v-model="newCategory.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$t('app.todolist.save')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: mapGetters({
    allCategories: 'allCategories',
    loading: 'loading',
  }),
  data() {
    return {
      newCategory: {
        content: ''
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.newCategory.content.length > 0) {
        this.$store.dispatch('ADD_NEW_CATEGORY',this.newCategory).then( (message) => {
          if (message === 'success') {
            this.$message({
              message: this.$i18n.t('blog.category.newCategory.success'),
              type: 'success'
            });
          } else {
            this.$message.error(this.$i18n.t('blog.category.newCategory.failure'));
          }
          this.newCategory.content = '';
        });
      }
    },
  },
  created() {
    this.$store.dispatch('SET_LOADING_ACTION', true);
    this.$store.dispatch('GET_ALL_CATEGORIES');
  }
}
</script>

<style lang="scss">
  @import "~styles/components/category.scss";
</style>