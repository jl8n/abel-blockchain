<script setup lang="ts">

const props = defineProps<{
  value?: number
  stat?: string
  color?: string
}>()

</script>

<template>
  <div class="column items-center">
    <div class="text-h1" :style="`color: ${ props.color };`">{{ props.value }}</div>
    <div class="text-subtitle2">{{ props.stat }}</div>
  </div>
</template>

<style lang="scss" scoped>
// TODO: move to global style to override quasar styles propesrly
.text-h1 {
  font-size: 5.5em;
  font-weight: 500;
  margin: 0;
}
</style>
