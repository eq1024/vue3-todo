<template>
  <div>
    <!-- new todo -->
    <edittodo
      type="text"
      v-model="newtodo"
      autofocus
      @keyup.enter="addtodo"
      placeholder="ADD TODO"
      autocomplete="off"
    ></edittodo>

    <ul>
      <todoitem
        v-for="todo in filterlist "
        :key="todo.id"
        :todo='todo'
        v-model:editingtodo="editingtodo"
        @deletetodo="deletetodo"
      ></todoitem>
    </ul>
    <!-- 筛选 -->
    <myfilter
      :state="state"
      v-model:filter="filter"
      @changestate="filter = $event"
    ></myfilter>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from 'vue'
import todoitem from '../components/todoitem.vue'
import myfilter from '../components/filter.vue'

const handleStorage = {
  get: (name) => {
    return localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : []
  },
  save: (name, array) => {
    localStorage.setItem(name, JSON.stringify(array))
  }
}
export default {
  components: {
    todoitem,
    myfilter
  },
  setup() {
    const state = reactive({
      state: ['all', 'undo', 'done'],
      newtodo: '',
      todolist: handleStorage.get('vue3-todolist'),
      editingtodo: null, //当前正在编辑的todo,用于确定那个todo处于编辑状态
      filter: 'all',
      filterlist: []
    })
    state.filterlist = computed(() => {
      switch (state.filter) {
        case 'all':
          return state.todolist
        case 'undo':
          return state.todolist.filter((item) => {
            return item.completed == false
          })
        case 'done':
          return state.todolist.filter((item) => {
            return item.completed == true
          })
      }
    })
    watchEffect(() => {
      handleStorage.save('vue3-todolist', state.todolist)
    })
    function addtodo() {
      state.todolist.push({
        id: state.todolist.length + 1,
        title: state.newtodo,
        completed: false
      })
      state.newtodo = ''
    }
    function deletetodo(todo) {
      state.todolist.splice(state.todolist.indexOf(todo), 1)
    }
    return {
      ...toRefs(state),
      addtodo,
      deletetodo
    }
  }
}
</script>

<style>
.completed {
  color: #999;
  text-decoration: line-through;
}
.view,
.editing .edit {
  display: block;
}
.edit,
.editing .view {
  display: none;
}
</style>