<template>
  <div>
    <h6>Sign in</h6>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input type="email" v-model="email" class="bg-gray-100 p-2 rounded-md" required />
      <br />
      <label for="password">Password</label>
      <input type="text" v-model="password" class="bg-gray-100 p-2 rounded-md" required />

      <br />

      <button type="submit" class="bg-indigo-400">Signin</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuth } from "../hooks/useAuth.ts"
import { useRouter } from "vue-router"

const email = ref("test@gmail.com")
const password = ref("!Test123456")

const { signinWithEmail, user } = useAuth()
const router = useRouter()
async function handleSubmit() {
  signinWithEmail(email.value, password.value).then(() => {
    router.push("/")
  })
}
</script>

<style scoped></style>
