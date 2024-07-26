<script setup lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue'
import { ref, onMounted } from 'vue'

interface Response {
  firstname: string;
  lastname: string;
  metrics: { name: string, value: number }[];
}

const data = ref<Response>({
  firstname: '',
  lastname: '',
  metrics: []
})

defineOptions({
  name: 'IndexPage'
})

async function fetchData () {
  const res = await fetch('http://localhost:3000/api/data')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  data.value = await res.json()
}

onMounted(async () => {
  await fetchData()
})

</script>

<template>
  <q-page padding>
    <div class="column items-center q-gutter-y-xl">
      <div class="text-h1">{{ data.firstname }} {{ data.lastname }}</div>
      <div class="row q-gutter-x-md">
        <q-card v-for="metric in data.metrics" :key="metric.name">
          <q-card-section class="column items-center q-gutter-lg q-pa-lg">
            <example-component
              :stat="metric.name"
              :value="metric.value"
              color="secondary"
            ></example-component>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>
