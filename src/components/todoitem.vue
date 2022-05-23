<template>
  <li :class="{completed:todo.completed,editing: todo === editingtodo} ">
    <!-- show todo -->
    <div class="view">
      <input
        type="checkbox"
        v-model="todo.completed"
      >
      <label @dblclick="edittodo(todo)">{{todo.title}}</label>
      <button @click="deletetodo(todo)">X</button>
    </div>
    <!-- edit todo -->
    <edittodo
      class="edit"
      type="text"
      v-model="todo.title"
      @blur="editdone(todo)"
      @keyup.enter="editdone(todo)"
      @keyup.escape="canceledit(todo)"
      v-todofocus
    ></edittodo>
  </li>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props: {
    todo: {
      type: Object,
      require: true
    },
    editingtodo: Object
  },
  emits:['deletetodo','update:editingtodo'],
  setup(props,{emit}) {
    const state = reactive({
      editcache: '' //缓存正在修改的值
    })
    function deletetodo(todo) {
      emit('deletetodo', todo)
    }
    function edittodo(todo) {
      state.editcache = todo.title
      emit('update:editingtodo', todo)
    }
    function canceledit(todo) {
      todo.title = state.editcache
      emit('update:editingtodo', null)
    }
    function editdone(todo) {
      emit('update:editingtodo', null)
    }
    return {
      deletetodo,
      canceledit,
      editdone,
      edittodo,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>