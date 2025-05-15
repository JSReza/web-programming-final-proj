import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bulma/css/bulma.css'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

const app = createApp(App)
app.use(Oruga)
app.mount('#app')