<template>
    <h3>Add new activity</h3>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="text">Time</label>
        <input type="text" id="text" placeholder="Enter time" v-model="text" />
      </div>
      <div class="form-control">
        <label for="activity">Activity</label>
        <input
          type="text"
          id="activity"
          placeholder="Enter activity"
          v-model="activity"
        />
      </div>
      <button class="btn">Add activity</button>
    </form>
  </template>
  
  <script setup>
  import { useToast } from 'vue-toastification';
  import { ref } from 'vue';
  
  const time = ref('');
  const amount = ref('');
  
  // Get toast interface
  const toast = useToast();
  
  const emit = defineEmits(['activitySubmitted']);
  
  const onSubmit = () => {
    if (!text.value || !amount.value) {
      // Display a toast error message if either field is empty
      toast.error('Both fields must be filled.');
      return;
    }
  
    const activityData = {
      time: time.value,
      amount: parseFloat(amount.value),
    };
  
    emit('activitySubmitted', activityData);
  
    // Clear form fields
    text.value = '';
    amount.value = '';
  };
  </script>