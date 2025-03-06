<script setup lang="ts">
import { ref } from 'vue'
import bulma from 'bulma/css/bulma.css'
import NavBar from './components/NavBar.vue';
import Statistics from './components/Statistics.vue'
import Activities from './components/Activities.vue';
import ActivityList from './components/ActivityList.vue';
import FriendsActivities from './components/FriendsActivities.vue';
const userActivities = ref([
  {
    id: 1,
    type: 'Weight Lifting',
    duration: '60',
    date: '2025-03-06T10:00:00'
  },

])
const friends = ref([
  {
    id: 1,
    name: 'Kendrick Lamar',
    activities: [
      {
        id: 1,
        type: 'Calisthenics',
        duration: '30 minutes',
        date: '2025-02-12'
      },
      {
        id: 2,
        type: 'Yoga',
        duration: '45 minutes',
        date: '2025-03-06'
      }
    ]
  },
  {
    id:2,
    name: 'Tom Holland',
    activities: [
      {
        id: 1,
        type: 'Calisthenics',
        duration: '30 minutes',
        date: '2025-03-06'
      },
      {
        id: 2,
        type: 'Yoga',
        duration: '45 minutes',
        date: '2025-03-06'
      }
    ]

  }
])
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main class="main-content container">
      <div class="sections">
        <section class="section">
          <Activities />
        </section>
        <div class="section">
    <Statistics :activities="userActivities" />
        </div>

        <section class="section">
          <FriendsActivities :friends="friends" />
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
