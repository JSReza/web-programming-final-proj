<template>
    <div class="box">
      <h3 class="title is-4 has-text-centered">
          <span>Your Workout Statistics</span>
      </h3>

      <div class="stats-container">
      <div class="notification-grid">
        <div class="notification">
          <p class="heading">Total Workouts</p>
          <p class="title">{{ activities.length }}</p>
        </div>
        
        <div class="notification">
          <p class="heading">This Week</p>
          <p class="title">{{ workoutsThisWeek }}</p>
        </div>
        
        <div class="notification">
          <p class="heading">Most Common Workout</p>
          <p class="title is-5">{{ mostFrequentWorkout }}</p>
        </div>
        
        <div class="notification">
          <p class="heading">Total Time</p>
          <p class="title is-5">{{ totalWorkoutTime }}</p>
        </div>
      </div>
    </div>
  
      <div class="recent-activities">
        <h4 class="title is-5 mb-4">Recent Activities</h4>
        <div class="timeline">
          <div v-for="activity in recentActivities" 
               :key="activity.id" >
              <div class="content">
                <strong>{{ activity.type }}</strong>
                <p class="is-size-7">Duration: {{ activity.duration }} minutes</p>
              </div>
            </div>
          </div>
        </div>
        </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  interface Activity {
    id: number
    type: string
    duration: string
    date: string
  }
  
  const props = defineProps<{
    activities: Activity[]
    }>()
  
 
  const workoutsThisWeek = computed(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return props.activities.filter(activity => 
      new Date(activity.date) >= oneWeekAgo
    ).length
  })
  
  const mostFrequentWorkout = computed(() => {
    const counts = props.activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] || 'No workouts yet'
  })
  
  const totalWorkoutTime = computed(() => {
    const totalMinutes = props.activities.reduce((total, activity) => {
      const duration = parseInt(activity.duration) || 0
      return total + duration
    }, 0)
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes}m`
  })
  
  const recentActivities = computed(() => {
    return [...props.activities]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  })
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  </script>
  
  <style scoped>
    h3,h4,.heading{
    color:darkseagreen;
  }

  .heading {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.1em;
  }
  
  .stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 1rem;
}

.notification {
  width: 100%;

  margin-bottom: 0 !important;
  transition: transform 0.2s ease;
}

.notification:hover {
  transform: translateY(-5px);
}

@media screen and (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
}
  </style>