<template>
  <div>
    <div class="flex items-center justify-between gap-4 bg-blue-100 p-3">
      <div class="text-lg" @click="$router.push('/')"><span class="text-green-400 font-bold">Vue</span> Chat App</div>
      <div class="flex gap-3">
        <button v-if="!isLogin" @click="$router.push('/signup')">Sign up</button>
        <button v-if="isLogin" @click="$router.push('/profile')">Profile</button>
        <button v-if="!isLogin" @click="$router.push('/signin')">Sign in</button>
        <button v-else class="bg-red-400" @click="signOut()">Sign out</button>
      </div>
    </div>

    <br />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useAuth } from "./hooks/useAuth"
import { storeToRefs } from "pinia"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { UserTy } from "./types/type"

const { signOut } = useAuth()

const authStore = useAuth()
const { isLogin, user } = storeToRefs(authStore)

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (_user) => {
    if (_user) {
      user.value = _user as UserTy
    } else {
    }
  })
})
</script>

<style scoped></style>
