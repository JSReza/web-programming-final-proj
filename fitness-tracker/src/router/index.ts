import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    }
   
  
    
  ]
})

export default router