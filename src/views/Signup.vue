<template>
  <div>
    <h6>Sign up</h6>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input type="email" v-model="email" class="bg-gray-100 p-2 rounded-md" required />
      <br />
      <label for="password">Password</label>
      <input type="text" v-model="password" class="bg-gray-100 p-2 rounded-md" required />

      <br />

      <button type="submit" class="bg-indigo-400">Signup</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuth } from "../hooks/useAuth.ts"
import { useRouter } from "vue-router"

const email = ref("test@gmail.com")
const password = ref("!Test123456")

const { signupWithEmail, user } = useAuth()

async function handleSubmit() {
  try {
    const res = await signupWithEmail(email.value, password.value)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
