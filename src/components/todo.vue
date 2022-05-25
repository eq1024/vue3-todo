<template>
  <div>
    <!-- new todo -->
    <edittodo
      type="text"
      v-model="newtodo"
      autofocus
      @keyup.enter="addtodo(newtodo)"
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
import {useTodo} from '../components/usetodo'

// const handleStorage = {
//   get: (name) => {
//     return localStorage.getItem(name)
//       ? JSON.parse(localStorage.getItem(name))
//       : []
//   },
//   save: (name, array) => {
//     localStorage.setItem(name, JSON.stringify(array))
//   }
// }


export default {
  components: {
    todoitem,
    myfilter
  },
  setup() {
    const state = reactive({
      state: ['all', 'undo', 'done'],
      newtodo: '',
      editingtodo: null, //当前正在编辑的todo,用于确定那个todo处于编辑状态
      filter: 'all',
      filterlist: []
    })

  const {todolist, addtodo, deletetodo} = useTodo(state)

    state.filterlist = computed(() => {
      switch (state.filter) {
        case 'all':
          return todolist.value
        case 'undo':
          return todolist.value.filter((item) => {
            return item.completed == false
          })
        case 'done':
          return todolist.value.filter((item) => {
            return item.completed == true
          })
      }
    })


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