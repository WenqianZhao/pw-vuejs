<template>
  <div class="todo-list">
    <el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="this.$i18n.t('app.todolist.label1')" name="todoList"></el-tab-pane>
        <el-tab-pane :label="this.$i18n.t('app.todolist.label2')" name="haveDone"></el-tab-pane>
        <el-tab-pane :label="this.$i18n.t('app.todolist.label3')" name="missed"></el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row class="list-table">
      <el-table
        :data="todolistItems"
        border
        style="width: 100%">
        <el-table-column
          prop="content"
          sortable
          :label="this.$i18n.t('app.todolist.table.label1')"
          width="350">
          <template scope="scope">
            <span v-if="modifying && (scope.$index === modifyingIndex)">
              <el-col :span="6">
               <el-input size="mini" v-model="newContent" type="text"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button size="mini" @click="saveModification(scope.$index, scope.row.id)">Save</el-button>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button size="mini" @click="resetModificationFields">Cancel</el-button>
              </el-col>
            </span>
            <span v-else>
              {{ scope.row.content }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="importance"
          sortable
          :label="this.$i18n.t('app.todolist.table.label2')"
          width="200"
          :filters="[{ text: 'High', value: 'High' }, { text: 'Middle', value: 'Middle' }, { text: 'Low', value: 'Low' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template scope="scope">
            <el-tag
              :type="getTypeOfTag(scope.row.importance)"
              close-transition>{{scope.row.importance}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="daysRemain"
          sortable
          :label="this.$i18n.t('app.todolist.table.label3')"
          width="200">
        </el-table-column>
        <el-table-column
          prop="operations"
          :label="this.$i18n.t('app.todolist.table.label4')"
          >
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">{{$t('app.todolist.table.modify')}}</el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleFinish(scope.$index, scope.row)">{{$t('app.todolist.table.finish')}}</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">{{$t('app.todolist.table.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="add-new-task">
      <div v-if="showAddLink">
        <a href="#/todolist" @click="changeState">{{$t('app.todolist.addNew')}}</a>
      </div>
      <div v-else>
        <el-form :inline="true" :model="newTask" class="form-inline" :rules="rules" ref="newTask">
          <el-form-item :label="this.$i18n.t('app.todolist.table.label1')" prop="content">
            <el-input v-model="newTask.content"></el-input>
          </el-form-item>
          <el-form-item :label="this.$i18n.t('app.todolist.table.label2')" prop="importance">
            <el-select v-model="newTask.importance" placeholder="">
              <el-option label="High" value="High"></el-option>
              <el-option label="Middle" value="Middle"></el-option>
              <el-option label="Low" value="Low"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="this.$i18n.t('app.todolist.newTask.deadline')" prop="deadline">
            <el-date-picker
              v-model="newTask.deadline"
              type="date"
              >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-row>
          <el-button type="primary" @click="onSubmit('newTask')">{{$t('app.todolist.save')}}</el-button>
          <el-button type="danger" @click="onCancel">{{$t('app.todolist.cancel')}}</el-button>
        </el-row>
      </div>

    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: mapGetters({
  	loading: 'loading',
  	userObj: 'userObj',
    todolistItems: 'todolistItems',
  }),
  data() {
    var validateDeadline = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$i18n.t('app.todolist.newTask.rules.deadline.required')));
      }
      var today = new Date();
      if ((value - today)/(24*60*60*1000) < -1) {
        return callback(new Error(this.$i18n.t('app.todolist.newTask.rules.deadline.afterToday')));
      } else {
        callback();
      }
    };
    return {
    	activeName: 'todoList',
      showAddLink: true,
      modifyingIndex: -1,
      modifying: false,
      newContent: '',
      newTask: {
        email: '',
        content: '',
        importance: '',
        deadline: '',
      },
      rules: {
        content: [
          { required: true, message: this.$i18n.t('app.todolist.newTask.rules.content'), trigger: 'blur' },
        ],
        importance: [
          { required: true, message: this.$i18n.t('app.todolist.newTask.rules.importance'), trigger: 'change' }
        ],
        deadline: [
          { required: true, validator: validateDeadline, trigger: 'change' }
        ]
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeState() {
      this.showAddLink = false;
    },
    filterTag(value, row) {
      return row.importance === value;
    },
    getTypeOfTag(importance) {
      if (importance === 'High') return 'danger';
      else return (importance === 'Middle' ? 'warning' : 'primary');
    },
    handleEdit(index, row) {
      this.modifying = true;
      this.modifyingIndex = index;
      this.newContent = row.content;
    },
    handleFinish(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.newTask.email = this.userObj.email;
          this.$store.dispatch('ADD_NEW_TASK',this.newTask).then( (message) => {
            if (message === 'success') {
              this.$message({
                message: this.$i18n.t('app.todolist.newTask.success'),
                type: 'success'
              });
            } else {
              this.$message.error(this.$i18n.t('app.todolist.newTask.failure'));
            }
            this.showAddLink = true;
            this.newTask.content = '';
            this.newTask.importance = '';
            this.newTask.deadline = '';
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onCancel() {
      this.showAddLink = true;
      this.newTask.content = '';
      this.newTask.importance = '';
      this.newTask.deadline = '';
    },
    saveModification(index, id) {
      this.$store.dispatch('MODIFY_TODOLIST_ITEM',{
        index: index,
        id: id,
        content: this.newContent
      });
      this.modifying = false;
    },
    resetModificationFields() {
      this.modifying = false;
    }
  },
  created() {
  	this.$store.dispatch('SET_LOADING_ACTION', true);
  	this.$store.dispatch('GET_TODOLIST',{
      email: this.userObj.email,
      itemClass: 'toDoList'
    });
  }
}
</script>

<style lang="scss">
  @import "~styles/components/todolist.scss";
</style>