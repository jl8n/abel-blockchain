<script setup lang="ts">
import ExampleComponent from 'components/ExampleComponent.vue'
import { ref, onMounted } from 'vue'
import { useUserStore } from 'stores/userStore'

// temporary
console.log('server url: ', process.env.SERVER_URL)

const userStore = useUserStore()

interface Response {
  title: string;
  firstname: string;
  lastname: string;
  metrics: { id: number, name: string, value: number }[];
}

const data = ref<Response>({
  title: '',
  firstname: '',
  lastname: '',
  metrics: []
})

const colors: string[] = [
  '#1db954',
  '#1e90ff',
  '#ff4757',
  '#ffa502'
]

defineOptions({
  name: 'IndexPage'
})

async function fetchData () {
  const res = await fetch(`${process.env.SERVER_URL}/api/data`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  data.value = await res.json()
  userStore.metrics = data.value.metrics
}

function getRandomColor (): string {
  const randomIndex: number = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <q-page padding class="dark-background column">
    <!-- TODO: grab title from store, not local fetch data -->
    <div class="title">{{ data.title }}</div>
    <div class="wrapper">
      <div class="column q-gutter-y-md items-center text-center">

      <div class="column items-center q-gutter-y-md text-center">
        <div class="name-display">{{ data.firstname }} {{ data.lastname }} is owed:</div>
      </div>

        <div class="row q-gutter-md justify-center ">
          <q-card flat v-for="metric in userStore.metrics" :key="metric.name" class="metric-card col-12 col-sm-auto">
            <q-card-section class="column items-center q-gutter-lg q-pa-lg">
              <example-component
                :stat="metric.name"
                :value="metric.value"
                :color="getRandomColor()"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>

  </q-page>

</template>

<style scoped>

.dark-background {
  background-color: #121212;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  border-radius: 8px;
  background-color: #1e1e1e;
}

.title {
  font-size: 5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
}

.metric-card {
  background-color: #2c2c2c;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
}

.metric-card:hover {
  transform: translateY(-5px);
  background-color: #333333;
}

.name-display {
  font-size: 1.5rem;
  font-weight: 400;
  color: #b3b3b3;
}

</style>
