import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from '@/app/plugins/vuetify/vuetify'

import '@/app/styles/index.scss'

import App from '@/app/App.vue'
import router from '@/app/plugins/router/index'

export const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
