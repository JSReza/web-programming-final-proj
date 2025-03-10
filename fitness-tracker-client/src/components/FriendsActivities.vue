<template>
    <div class="box">
      <h3 class="title is-4 has-text-centered ">
       <span>Friends' Activities</span>
      </h3>

      <div class="friends-activities">
        <div v-if="!friends.length" class="has-text-centered my-6">
          <p class="is-size-5 has-text-grey">No friends found</p>
        </div>
  
        <div v-for="friend in friends" :key="friend.id" class="friend-section mb-5">
          <div class="friend-header level is-mobile mb-2">
            <div class="level-left">
              <div class="level-item">
                <span class="ml-3 has-text-weight-semibold has-text-centered ">{{ friend.name }}</span>
              </div>
            </div>
          </div>
  
          <div class="pl-5">
            <div v-if="!friend.activities.length" >No activities yet</div>
  
            <div v-for="activity in friend.activities" :key="activity.id" class="box">
              <div class="content">
                <p class="is-size-5 has-text-weight-medium">{{ activity.type }}</p>
                <div class="tags">
                  <span class="tag">
                    <span class="icon">
                      <i class="fas fa-clock"></i>
                    </span>
                    <span>{{ activity.duration }}</span>
                  </span>
                  <span class="tag">
                    <span class="icon">
                      <i class="fas fa-calendar"></i>
                    </span>
                    <span>{{ formatDate(activity.date) }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'

interface Activity {
  id: number
  type: string
  duration: string
  date: string
}

interface Friend {
  id: number
  name: string
  avatar?: string
  activities: Activity[]
}

const props = defineProps<{
  friends: Friend[]
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
  
  <style scoped>
    h3{
    color:darkseagreen;
  }
  .friends-activities {
    max-height: 700px;
    overflow-y: auto;
    padding-right: 1rem;
  }

  .friend-section {
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 1rem;
  }
  

  .friend-header {
    transition: background-color 0.2s ease;
    padding: 0.5rem;
    border-radius: 6px;
  }
  
  
  .tags {
    margin-top: 0.5rem;
  }
  
  .tag {
    padding: 0.5rem;
  }
  </style>