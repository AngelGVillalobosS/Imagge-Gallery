import { createApp } from 'vue'
import { Icon } from '@iconify/vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'


createApp(App).component('Icon', Icon).mount('#app')
