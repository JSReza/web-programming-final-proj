<script setup lang="ts">
import { ref,  defineProps, defineEmits, computed  } from 'vue'
import { Autocomplete} from '@oruga-ui/oruga-next';
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

const workoutTypes = [
  'Running',
  'Walking',
  'Cycling',
  'Swimming',
  'Weight Lifting',
  'Yoga',
  'HIIT',
  'Boxing',
  'Pilates',
  'Basketball'
]

const searchWorkouts = (query: string) => {
  return workoutTypes.filter(type => 
    type.toLowerCase().includes(query.toLowerCase())
  )
}

const handleAutocompleteSelect = (type: string) => {
  newActivity.value.type = type
}

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
        <o-autocomplete
          v-model="newActivity.type"
          :data="searchWorkouts(newActivity.type)"
          placeholder="Enter activity"
          @select="handleAutocompleteSelect"
          class="input"
          expanded
        />
      </div>
    </div>
    <div class="field">
      <label class="label" for="duration">Duration</label>
      <div class="control">
        <input class="input" type="number" id="duration"placeholder="Enter duration" v-model.trim="newActivity.duration" />
      </div>
    </div>

    <div class="field">
      <label class="label" for="date">Date</label>
      <div class="control">
        <input class="input" type="date" id="date"v-model="newActivity.date" 
        />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-primary" @click="saveWorkout">Add Activity</button>
      </div>
    </div>

    <div class="mt-5">
      <h3 class="title is-5">Recent Activities</h3>
      <div v-if="!activities.length" class="has-text-grey">No activities yet</div>
      <ul class="activity-list">
        <li v-for="activity in activities" :key="activity.id"class="box mb-3">
          <div class="level">
            <div class="level-left">{{ activity.type }} - {{ activity.duration }} minutes</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  h1,h2,h3,span{
    color:darkseagreen;
  }
.activity-list {
  list-style: none;
  padding: 0;
}

.box {
  transition: transform 0.2s ease;
}

:deep(.o-autocomplete) {
  width: 100%;
}

:deep(.o-autocomplete-item) {
  padding: 0.5rem;
  cursor: pointer;
}

:deep(.o-autocomplete-item:hover) {
  background-color: #f5f5f5;
}
</style>