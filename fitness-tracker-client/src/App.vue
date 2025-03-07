<script setup lang="ts">
import { ref } from 'vue'
import bulma from 'bulma/css/bulma.css'
import NavBar from './components/NavBar.vue';
import Statistics from './components/Statistics.vue'
import Activities from './components/Activities.vue';
//import ActivityList from './components/ActivityList.vue';
import FriendsActivities from './components/FriendsActivities.vue';

interface Activity {
  id: number
  type: string
  duration: string
  date: string
}

const currentUser = ref(null)
const userActivities = ref<Activity[]>([
  {
    id: 1,
    type: 'Weight Lifting',
    duration: '60',
    date: '2025-03-06T10:00:00'
  }
])

const handleActivityAdded = (newActivity: Activity) => {
  userActivities.value.push(newActivity)
}

const handleActivityDeleted = (id: number) => {
  userActivities.value = userActivities.value.filter(activity => activity.id !== id)
}
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
    name: 'Billie Eilish',
    activities: [
      {
        id: 1,
        type: 'Boxing',
        duration: '30 minutes',
        date: '2025-03-03'
      },
      {
        id: 2,
        type: 'Weight lifting',
        duration: '30 minutes',
        date: '2025-03-02'
      }
    ]

  }
])
</script>

<template>
    <NavBar :currentUser="currentUser" />
    <main class="main-content container">
      <div class="sections">
        <section class="section">
        <Activities 
          :activities="userActivities"
          @activity-added="handleActivityAdded"
          @activity-deleted="handleActivityDeleted"
        />
      </section>
        <div class="section">
    <Statistics :activities="userActivities" />
        </div>

        <section class="section">
          <FriendsActivities :friends="friends" />
        </section>
      </div>
    </main>
</template>

<style scoped>
  h1,h2,h3{
    color:darkseagreen;
  }
  .main-content {
    margin-top: 2rem;
  }

  .sections {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .section {
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  .section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
