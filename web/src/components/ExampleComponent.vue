<script setup lang="ts">

const props = defineProps<{
  value?: number
  stat?: string
  color?: string
}>()

</script>

<template>
  <div class="column items-center">
    <div class="text-h1">{{ props.value }}</div>
    <div class="text-subtitle2">{{ props.stat }}</div>
  </div>
</template>

<style lang="scss" scoped>
// TODO: move to global style to override quasar styles properly
.text-h1 {
  font-size: 5.5em;
  margin: 0;
}
</style>
