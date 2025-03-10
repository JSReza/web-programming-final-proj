<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'


const emit = defineEmits(['logout'])
const router = useRouter()


const handleLogout = () => {
  emit('logout')
  router.push('/login')
}

</script>
<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">


    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons are-medium">
            <button class="button ml-4">
        <strong>Fitness Tracker</strong>
    </button>
          <button class="button ml-4" @click="handleLogout">
            <span class="icon">
              <i class="fas fa-sign-out-alt"></i>
            </span>
            <span>Log out</span>
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;
}

.navbar-item img {
  max-height: 40px;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.button {
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.tag {
  font-size: 1rem;
  padding: 1.25rem;
}

@media screen and (max-width: 768px) {
  .buttons {
    flex-direction: column;
    width: 100%;
  }

  .button {
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style>