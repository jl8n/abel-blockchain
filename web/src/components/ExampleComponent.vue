<script setup lang="ts">

const props = defineProps<{
  value?: number
  stat?: string
  color?: string
}>()

</script>

<template>
  <q-card>
    <q-card-section class="text-white column items-center q-gutter-lg q-pa-lg" :class="'bg-' + color">
      <div class="text-h1">{{ props.value }}</div>
      <div class="text-subtitle2">{{ props.stat }}</div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
// TODO: move to global style to override quasar styles properly
.text-h1 {
  font-size: 5.5em;
  margin: 0;
}
</style>
