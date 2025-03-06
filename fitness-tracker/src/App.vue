<template>

      <Dashboard/>
</template>

<script setup lang = "ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import type {User} from './types'
import Dashboard from './components/Dashboard.vue'

const router = useRouter()
const currentUser = ref<User | null>(null)

const logout = () =>{
  currentUser.value = null
  router.push('/login')
}

</script>
