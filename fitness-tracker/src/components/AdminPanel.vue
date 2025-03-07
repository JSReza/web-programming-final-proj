<template>
    <div class="column is-3" v-if="users">
        <div class="box">
            <h3 class="title is-4">Admin Panel</h3>
            <div class="content">
                <ul>
                    <li v-for="user in users" :key="user.id">
                        {{ user.name }} - {{ user.role }}
                        <button @click="$emit('delete', user)" class="button is-small is-danger">Delete</button>
                        <button @click="$emit('edit-user', user)" class="button is-small is-info">Edit</button>
                    </li>
                </ul>
                <button @click="$emit('add', { id: users.length + 1, name: 'New User', role: 'user' })" class="button is-primary">Add User</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '../types'

defineProps<{
    users: User[]
}>()

defineEmits<{
    (e: 'add', user: User): void
    (e: 'edit-user', user: User): void
    (e: 'delete', user: User): void
}>()
</script>