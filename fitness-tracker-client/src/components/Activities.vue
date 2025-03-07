<script setup lang="ts">
import { ref } from 'vue'

interface Activity {
  id: number
  type: string
  duration: string
  date: string
}

const props = defineProps<{
  activities: Activity[]
}>()

const emit = defineEmits(['activity-added', 'activity-deleted'])

const newActivity = ref({
  type: '',
  duration: '',
  date: new Date().toISOString().slice(0, 10)
})

const saveWorkout = () => {
  if (!newActivity.value.type || !newActivity.value.duration) {
    return
  }

  emit('activity-added', {
    id: Date.now(),
    ...newActivity.value
  })

  newActivity.value.type = ''
  newActivity.value.duration = ''
  newActivity.value.date = new Date().toISOString().slice(0, 10)
}
</script>

<template>
  <div class="box">
    <header class="mb-4">
      <h2 class="title is-4">Add Activity</h2>
    </header>

    <div class="field">
      <label class="label" for="activity">Activity</label>
      <div class="control">
        <input 
          class="input" 
          type="text" 
          id="activity"
          placeholder="Enter activity" 
          v-model.trim="newActivity.type" 
        />
      </div>
    </div>

    <div class="field">
      <label class="label" for="duration">Duration (minutes)</label>
      <div class="control">
        <input 
          class="input" 
          type="number" 
          id="duration"
          placeholder="Enter duration" 
          v-model.trim="newActivity.duration" 
        />
      </div>
    </div>

    <div class="field">
      <label class="label" for="date">Date</label>
      <div class="control">
        <input 
          class="input" 
          type="date" 
          id="date"
          v-model="newActivity.date" 
        />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button 
          class="button is-primary" 
          @click="saveWorkout"
        >
          Add Activity
        </button>
      </div>
    </div>

    <!-- Activities List -->
    <div class="mt-5">
      <h3 class="title is-5">Recent Activities</h3>
      <div v-if="!activities.length" class="has-text-grey">
        No activities yet
      </div>
      <ul class="activity-list">
        <li 
          v-for="activity in activities" 
          :key="activity.id"
          class="box mb-3"
        >
          <div class="level">
            <div class="level-left">
              {{ activity.type }} - {{ activity.duration }} minutes
            </div>
            <div class="level-right">
              <button 
                class="delete" 
                @click="$emit('activity-deleted', activity.id)"
              ></button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
            </template>

<style scoped>
.activity-list {
  list-style: none;
  padding: 0;
}

.box {
  transition: transform 0.2s ease;
}

.box:hover {
  transform: translateY(-2px);
}
</style>