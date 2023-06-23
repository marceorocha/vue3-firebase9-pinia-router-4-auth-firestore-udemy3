import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: 'marcerocha@gmail.com'
    })
})