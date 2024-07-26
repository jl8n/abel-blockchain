<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  visible: boolean
}>(), {
  visible: false
})

const dialogVisible = ref(props.visible)
</script>

<template>
  <q-dialog v-model="dialogVisible">
  <q-card>
    <q-card-section>
      <div class="text-h6">Alert</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="OK" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</q-dialog>

</template>
