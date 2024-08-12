<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from 'stores/userStore'
import { Metric } from '../../../shared-types'

const userStore = useUserStore()

const alert = ref(false)
const password = ref('')
const authenticated = ref(false)
const localMetrics = ref<Metric[]>([])
const loading = ref(true)

onMounted(async () => {
  await fetchInitialData()
})

async function fetchInitialData () {
  loading.value = true
  const success = await userStore.fetchMetrics()
  if (success) {
    // Initialize local metrics with a deep copy of store metrics
    localMetrics.value = JSON.parse(JSON.stringify(userStore.metrics))
    console.log('fetched data', localMetrics.value)
  } else {
    console.error('Failed to fetch initial data')
  }
  loading.value = false
}

async function saveMetrics () {
  const success = await userStore.updateMetrics(localMetrics.value)
  if (success) {
    console.log('Metrics updated successfully')
    // Refresh localMetrics from the store
    localMetrics.value = JSON.parse(JSON.stringify(userStore.metrics))
  } else {
    console.error('Failed to update metrics')
    // Revert localMetrics to the store state
    localMetrics.value = JSON.parse(JSON.stringify(userStore.metrics))
  }
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark" >
      <q-toolbar>

        <q-toolbar-title>
          <!-- leave empty for page formatting -->
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="edit"
          aria-label="More"
          @click="alert = true"
          style="color: #ffffff75"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="alert" size="large">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Edit</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column">
            <q-input v-model="password" type="password" label="Password" />
            <q-btn
              flat
              color="primary"
              label="Authenticate"
              @click="authenticated = password === 'password'"
            />
          </div>
          <div v-if="!authenticated">
            <div v-for="metric in localMetrics" :key="metric.id">
            <q-input v-model.number="metric.value" :label="metric.name" />
            </div>
          </div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Submit" color="primary" @click="saveMetrics" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<style scoped lang="scss">
.transparent-header {
  background-color: transparent; /* Keep the header transparent */
  position: absolute; /* Float above the content */
  top: 0;
  width: 100%;
  z-index: 1000; /* Ensure it stays on top */
}

</style>
