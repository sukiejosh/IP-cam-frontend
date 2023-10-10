import { $fetch } from 'ohmyfetch'
import { defineStore } from 'pinia'

export const baseUrl = 'https://project-ip-cam.fly.dev'

const fetcher = $fetch.create({ baseURL: `${baseUrl}` })

export const useUserStore = defineStore('users', {
    state: () => ({
        photos: [] as any[],
        currentPhoto: null as any
    }),
    actions: {
        async getAllPhotos() {
            const userData = await fetcher('/upload')
            const { error, data } = userData
            console.log('photos', data)

            this.photos = data
        },
        setImage(i: number) {
            this.currentPhoto = this.photos[i]
        }
    },
    persist: false

})