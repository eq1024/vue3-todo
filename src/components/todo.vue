<template>
  <div>
    <!-- new todo -->
    <input type="text" v-model="newtodo" @keyup.enter="addtodo" placeholder="ADD TODO" autocomplete="off">
    <!-- show todo -->
    <ul v-for="todo in todolist" :key="todo.id">
      <li>
        <label>{{todo.title}} --- {{todo.completed}}</label>
				<button @click="deletetodo(todo)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      newtodo: '',
      todolist: []
    })
    function addtodo() {
      state.todolist.push({
        id: state.todolist.length + 1,
        title: state.newtodo,
        completed: false
      })
      state.newtodo = ''
    }
		function deletetodo(todo){
			state.todolist.splice(state.todolist.indexOf(todo),1)
		}
    return {
      ...toRefs(state),
      addtodo,
			deletetodo,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>