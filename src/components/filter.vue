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
  margin: 5px;
  border: solid #666 1px;
  border-radius: 2px;
  /* background-color: pink; */
}
</style>