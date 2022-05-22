<template>
  <div>
    <!-- new todo -->
    <input type="text" v-model="newtodo" @keyup.enter="addtodo" placeholder="ADD TODO" autocomplete="off">
    <ul v-for="todo in filterlist " :key="todo.id">
      <li :class="{completed:todo.completed,editing: todo === editingtodo} ">
        <!-- show todo -->
        <div class="view">
          <input type="checkbox" v-model="todo.completed">
          <label @dblclick="edittodo(todo)">{{todo.title}} --- {{todo.completed}}</label>
          <button @click="deletetodo(todo)">X</button>
        </div>
        <!-- edit todo -->
        <input class="edit" type="text" v-todo-focus="todo === editingtodo" v-model="todo.title" @blur="editdone(todo)" @keyup.enter="editdone(todo)" @keyup.escape="canceledit(todo)">
      </li>
    </ul>
    <!-- 筛选 -->
    <p>
      <span @click="filter = 'all'" :class="{select:filter=== 'all' }">ALL</span>
      <span @click="filter = 'undo'" :class="{select:filter=== 'undo'}">UNDO</span>
      <span @click="filter = 'done'" :class="{select:filter=== 'done'}">DONE</span>
    </p>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watchEffect } from 'vue'
const handleStorage = {
  get: (name) => {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name))  : []
  },
  save: (name, array) => {
    localStorage.setItem(name, JSON.stringify(array))
  }
}
export default {
  setup() {
    const state = reactive({
      newtodo: '',
      todolist: handleStorage.get('vue3-todolist'),
      editcache: '', //缓存正在修改的值
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
    watchEffect(()=>{
      handleStorage.save('vue3-todolist',state.todolist)
    });
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
    function edittodo(todo) {
      state.editcache = todo.title
      state.editingtodo = todo
    }
    function canceledit(todo) {
      todo.title = state.editcache
      state.editingtodo = null
    }
    function editdone(todo) {
      state.editingtodo = null 
    }
    return {
      ...toRefs(state),
      addtodo,
      deletetodo,
      editdone,
      canceledit,
      edittodo
    }
  },
  // 自定义指令
  directives: {
    'todo-focus': (el, bind) => {
      if (bind.value) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
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
.select {
  background-color: pink;
}
</style>