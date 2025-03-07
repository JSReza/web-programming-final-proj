<script lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast();
import bulma from 'bulma/css/bulma.css';
import { onKeyUp } from '@vueuse/core';

interface Activity {
  id: number;
  activity: string;
  duration: string;
  date: string;
}

const heading = ref('Activity as of late')
const activities = ref<Activity[]>([])
const activity = ref('')
const duration = ref('')
const date = ref('')
const emit = defineEmits(['activitySubmitted']);
const saveWorkout = () => {
  activities.value.push({id: activities.value.length+1, activity:activity.value,duration:duration.value,date:date.value});
  activity.value = '';
  duration.value = '';
  date.value = '';
}
</script>
<template>
<header>
    <h2>{{ heading }}</h2>
</header>
<div class="form-control">
<label for="activity">Activity</label>
<input type = "activity" placeholder = "Enter activity" v-model.trim = "activity" />
<label for="time">Time</label>
<input type = "number" placeholder = "Enter duration" v-model.trim = "duration" />
<label for="date">Date</label>
<input type = "date" placeholder = "Enter date" v-model = "date" />

<button class="button is-success ml-4"
 v-on:click="activities.push({id: activities.length+1, activity:activity,duration:duration,date:date})"
 v-on:keyup.enter="activities.push({id: activities.length+1, activity:activity,duration:duration,date:date})">
 Add Activity</button>
</div>
<ul>
<li class = "is-success "v-for="activity in activities" :key="activity.id">{{ activity.type }} - {{ activity.duration }} minutes</li>
</ul>
<p v-if = "!activities.length">No activities yet</p>
</template>