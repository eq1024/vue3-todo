<template>
  <p>
    <span
      v-for="(item,key,index) in state"
      :key="index"
      @click="$emit('changestate',item)"
      :class="{select:filter=== item }"
    >{{item}}</span>
  </p>
</template>

<script>
export default {
  props: ['state','filter'],
  setup() {
    return {}
  }
}
</script>

<style scoped>
.select {
  background-color: pink;
}
</style>