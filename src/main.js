import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import router from '@/router'
// @ts-ignore
import App from '@/App.vue'

import './assets/main.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router).mount('#app')
