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
            // console.log('photos', data)
            if (!!data == true && Array.isArray(data) && data.length > 0)
                this.photos = data
        },
        setImage(id: string) {
            this.currentPhoto = this.photos.find(x => x.id == id)
        }
    },
    persist: false

})