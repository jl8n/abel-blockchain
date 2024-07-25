<script setup lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue'

defineOptions({
  name: 'IndexPage'
})

</script>

<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      stat="Slaps in the Face"
      :value="9"
      color="primary"
    ></example-component>

    <example-component
      stat="Kicks in the Nuts"
      :value="25"
      color="secondary"
    ></example-component>
  </q-page>
</template>
