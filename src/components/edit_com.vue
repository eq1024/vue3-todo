<template>
  <input
    type="text"
    :value="modelValue"
    @change="onValueChage"
    v-bind="$attrs"
  >
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods:{
      onValueChage(e){
          this.$emit('update:modelValue',e.target.value)
      }
  }
}
</script>

<style>
</style>