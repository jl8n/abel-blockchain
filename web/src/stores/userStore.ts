import { defineStore } from 'pinia'
import type { Metric, GetResponse } from '../../../shared-types' // Adjust the import path as needed

export const useUserStore = defineStore('user', {
  state: () => ({
    // TODO: add title, other things in db
    title: '',
    firstname: '',
    lastname: '',
    metrics: [] as Metric[]
  }),
  actions: {
    setMetrics (newMetrics: Metric[]) {
      this.metrics = newMetrics
    },

    async fetchMetrics () {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/api/data`)
        if (!response.ok) {
          throw new Error('Failed to fetch metrics')
        }
        const data: GetResponse = await response.json()
        this.setMetrics(data.metrics)
        return true
      } catch (error) {
        console.error('Error fetching metrics:', error)
        return false
      }
    },

    async updateMetrics (updatedMetrics: Metric[]) {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/api/data`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedMetrics)
        })

        if (!response.ok) {
          throw new Error('Failed to update metrics')
        }

        const data = await response.json()
        this.setMetrics(data.updatedMetrics)
        return true
      } catch (error) {
        console.error('Error updating metrics:', error)
        return false
      }
    }
  }
})
