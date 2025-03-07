<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
  email: string;
}

const props = defineProps<{
  currentUser: User | null;
}>()

const emit = defineEmits(['logout'])
const router = useRouter()

const isActive = ref(false)

const toggleBurger = () => {
  isActive.value = !isActive.value
}

const handleLogout = () => {
  emit('logout')
  router.push('/login')
}

const isAdmin = computed(() => props.currentUser?.role === 'admin')
</script>
// ...existing code...

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <strong>Fitness Tracker</strong>
      </a>

      <a role="button" 
         :class="{'is-active': isActive}" 
         class="navbar-burger" 
         aria-label="menu" 
         @click="toggleBurger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <!-- Show user info when logged in -->
        <div v-if="currentUser" class="buttons are-medium">
          <span class="tag is-info is-medium mr-4">Welcome, {{ currentUser.name }}</span>
          <button class="button is-light ml-4" @click="handleLogout">
            <span class="icon">
              <i class="fas fa-sign-out-alt"></i>
            </span>
            <span>Log out</span>
          </button>
        </div>
        <!-- Show login/signup when not logged in -->
        <div v-else class="buttons are-medium">
          <a class="button is-primary mr-4" href="/register">
            <span class="icon">
              <i class="fas fa-user-plus"></i>
            </span>
            <span>Sign up</span>
          </a>
          <a class="button is-primary ml-4" href="/login">
            <span class="icon">
              <i class="fas fa-sign-in-alt"></i>
            </span>
            <span>Log in</span>
          </a>
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