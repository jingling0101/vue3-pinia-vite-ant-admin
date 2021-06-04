import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import {setupAn} from './ant-design'
import './permission'

import mockServe from '../mock/mock.js'
mockServe()

const pinia = createPinia()
const app = createApp(App)
setupAn(app)
app.use(pinia)


app.use(router)
app.mount('#app')
