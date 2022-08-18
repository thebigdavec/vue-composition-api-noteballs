<script setup>
import { useAuthStore } from '../../stores/authStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const showMobileNav = ref(false)

const logout = async () => {
  showMobileNav.value = false
  await authStore.logout()
  router.replace({ name: 'auth' })
}

const navRef = ref(null)
const burgerRef = ref(null)
onClickOutside(navRef, () => (showMobileNav.value = false), {
  ignore: [burgerRef]
})
</script>

<template>
  <nav
    ref="navRef"
    role="navigation"
    aria-label="main navigation"
    :class="{ 'show-mobile-nav': showMobileNav }"
  >
    <RouterLink @click="showMobileNav = false" :to="{ name: 'notes' }">
      Notes
    </RouterLink>
    <RouterLink @click="showMobileNav = false" :to="{ name: 'stats' }">
      Stats
    </RouterLink>
    <RouterLink
      @click="showMobileNav = false"
      v-if="!user.isLoggedIn"
      :to="{ name: 'auth' }"
    >
      Login
    </RouterLink>
    <button v-else @click="logout" class="link-btn">Logout</button>
  </nav>
  <div
    ref="burgerRef"
    class="burger"
    :class="{ 'show-burger': showMobileNav }"
    @click="showMobileNav = !showMobileNav"
  />
</template>

<style scoped>
nav {
  position: absolute;
  display: none;
  gap: var(--size-3);
  width: 100%;
  top: var(--size-10);
  left: 0;
  justify-content: left;
  padding: var(--size-6) var(--size-fluid-6);
  box-shadow: var(--shadow-4);
  background-color: var(--surface-1);
}
nav.show-mobile-nav {
  display: grid;
}
button {
  text-shadow: 2px 2px 0 black;
  color: var(--blue-3);
  font-weight: 400;
}
.burger {
  position: absolute;
  background-color: var(--surface-1);
  top: var(--size-4);
  right: var(--size-fluid-4);
  width: var(--size-8);
  height: var(--size-8);
  cursor: pointer;
}
.burger::before,
.burger::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  width: var(--size-7);
  height: var(--size-1);
  background-color: white;
  border-radius: var(--size-2);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-out;
}
.burger::after {
  box-shadow: 0 9px 0 white, 0 -9px 0 white;
}
.burger.show-burger::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.burger.show-burger::after {
  transform: translate(-50%, -50%) rotate(-45deg);
  box-shadow: 0 9px 0 #fff0, 0 -9px 0 #fff0;
}
@media (min-width: 768px) {
  nav {
    position: unset;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--size-4);
    width: auto;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
  }
  nav a {
    color: var(--blue-3);
    text-shadow: 2px 2px 0 black;
    transition: color 0.5s ease-out;
  }
  nav a:hover,
  nav a:focus-visible {
    color: var(--blue-1);
    transition: color 100ms ease-in;
  }
  nav .router-link-active {
    color: var(--gray-3);
  }
  nav .router-link-exact-active {
    color: var(--gray-2);
  }
  nav::before {
    display: none;
  }
  .burger {
    display: none;
  }
}
</style>
