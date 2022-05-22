<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <todo></todo>
</template>

<script>
import todo from './components/todo.vue'

export default {
  name: 'App',
  components: {
    todo
  }
}
</script>
