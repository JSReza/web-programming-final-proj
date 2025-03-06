<template>
    <div class="box">
      <h3 class="title is-4 has-text-centered is-danger">
     
       <span>Friends' Activities</span>
      </h3>

      <div class="friends-activities">
        <div v-if="!filteredFriends.length" class="has-text-centered my-6">
          <p class="is-size-5 has-text-grey">No friends found</p>
        </div>
  
        <div v-for="friend in filteredFriends" :key="friend.id" class="friend-section mb-5">
          <div class="friend-header level is-mobile mb-2">
            <div class="level-left">
              <div class="level-item">

                <span class="ml-3 has-text-weight-semibold">{{ friend.name }}</span>
              </div>
            </div>
          </div>
  
          <!-- Friend's Activities -->
          <div class="pl-5">
            <div v-if="!friend.activities.length" class="has-text-grey">
              No activities yet
            </div>
  
            <div 
              v-for="activity in friend.activities" 
              :key="activity.id" 
              class="box has-background-light"
            >
              <div class="content">
                <p class="is-size-5 has-text-weight-medium">
                  {{ activity.type }}
                </p>
                <div class="info">
                    <span>{{ activity.duration }}</span>
                    <br/>
                    <span>{{ formatDate(activity.date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
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
  
  const searchQuery = ref('')
  
  const filteredFriends = computed(() => {
    return props.friends.filter(friend => 
      friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  </script>
  
  <style scoped>
  .friends-activities {
    max-height: 700px;
    overflow-y: auto;
    padding-right: 1rem;
  }
  
  .friends-activities::-webkit-scrollbar {
    width: 6px;
  }
  
  .friends-activities::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  .friends-activities::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  .friend-section {
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 1rem;
  }
  
  .friend-section:last-child {
    border-bottom: none;
  }
  
  .friend-header {
    transition: background-color 0.2s ease;
    padding: 0.5rem;
    border-radius: 6px;
  }
  
  .friend-header:hover {
    background-color: #f5f5f5;
  }
  
  .box.has-background-light {
    transition: transform 0.2s ease;
  }
  
  .box.has-background-light:hover {
    transform: translateX(5px);
  }
  
  .tags {
    margin-top: 0.5rem;
  }
  
  .tag {
    padding: 0.5rem;
  }
  </style>