<script setup lang="ts">
import { ref } from 'vue'
import bulma from 'bulma/css/bulma.css'
import NavBar from './components/NavBar.vue';
import Statistics from './components/Statistics.vue'
import Activities from './components/Activities.vue';
//import ActivityList from './components/ActivityList.vue';
import FriendsActivities from './components/FriendsActivities.vue';
import activitiesData from './data/friends.json';
import friendsData from './data/friends.json';

interface Activity {
  id: number
  type: string
  duration: string
  date: string
}

const currentUser = ref(null)

const userActivities = ref<Activity[]>(activitiesData.friends[0].activities)
const friends = ref(friendsData.friends)

const handleActivityAdded = (newActivity: Activity) => {
  userActivities.value.push(newActivity)
}

const handleActivityDeleted = (id: number) => {
  userActivities.value = userActivities.value.filter(activity => activity.id !== id)
}

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
.main-content {
  margin-top: 2rem;
  padding: 0 2rem;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}

.sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.section {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.section:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
  .main-content {
    padding: 0 1rem;
  }
  
  .sections {
    grid-template-columns: 1fr;
  }
}
</style>
