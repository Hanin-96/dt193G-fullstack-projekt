//productStore
import { defineStore } from 'pinia'

export const useProductStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },

  actions: {
    increment() {
      this.count++
    },
  },
})