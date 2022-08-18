<script setup>
import { reactive, ref } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const { registerUser, login } = useAuthStore()
const register = ref(false)

const credentials = reactive({
  email: '',
  password: '',
  passwordConfirmation: ''
})

const handleSubmit = async () => {
  if (!credentials.email || !credentials.password) {
    alert('Please fill in all fields')
    return
  }
  if (register.value && !credentials.passwordConfirmation) {
    alert('Please confirm your chosen password')
    return
  }
  if (
    register.value &&
    credentials.password !== credentials.passwordConfirmation
  ) {
    alert('Passwords do not match')
    return
  }
  if (register.value && credentials.password.length < 6) {
    alert('Password must be at least 6 characters long')
    return
  }
  if (register.value) {
    await registerUser({
      email: credentials.email,
      password: credentials.password
    })
    router.push({ name: 'notes' })
  } else {
    await login({
      email: credentials.email,
      password: credentials.password
    })
    router.push({ name: 'notes' })
  }
}
</script>

<template>
  <div class="auth">
    <h1>Auth</h1>
    <div class="tabs container-inner">
      <ul>
        <li :class="{ 'is-active': !register }" @click="register = false">
          Login
        </li>
        <li :class="{ 'is-active': register }" @click="register = true">
          Register
        </li>
      </ul>
    </div>
    <div class="card container-inner auth-form">
      <div class="card-content">
        <h2>{{ register ? 'Register' : 'Login' }}</h2>
        <form @submit.prevent="handleSubmit">
          <label>
            Email:
            <input
              type="email"
              :placeholder="
                register
                  ? 'Enter your email address'
                  : 'Enter the email you registered with.'
              "
              v-autofocus
              v-model="credentials.email"
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              :placeholder="`${register ? 'Choose' : 'Enter'} your password.`"
              minlength="6"
              v-model="credentials.password"
              required
            />
            <div class="flex-end">
              <small v-if="register">(min 6 characters)</small>
              <small v-else><a href="">Forgotten Password</a></small>
            </div>
          </label>
          <label v-if="register">
            Confirm Password:
            <input
              type="password"
              placeholder="Confirm your password."
              minlength="6"
              v-model="credentials.passwordConfirmation"
              required
            />
            <div v-if="!register" class="flex-end"></div>
          </label>
          <div class="flex-between"></div>
          <div class="card-actions">
            <button>{{ register ? 'Register' : 'Login' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  margin-bottom: var(--size-6);
  border-block-end: 2px solid var(--gray-6);
}
.tabs ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
}
li {
  cursor: pointer;
  margin: 0 0 -2px;
  color: var(--gray-4);
  border-bottom: 2px solid transparent;
  padding: var(--size-2) var(--size-4);
  transition: background-color 0.5s ease-out, color 0.5s ease-out,
    border-color 0.5s ease-out;
}
li.is-active {
  border-bottom-color: var(--indigo-2);
  background-color: var(--surface-3);
  color: var(--gray-2);
  transition: background-color 100ms ease-in, color 100ms ease-in,
    border-color 100ms ease-in;
}
.auth-form {
  max-width: 500px;
}
.auth-form input {
  display: block;
  width: 100%;
}
small {
  margin-block-start: var(--size-2);
}
</style>
