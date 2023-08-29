<template>
  <div>
    <div v-if="isLogin">
      <ChatBox />
    </div>
    <div v-else class="text-center mt-20 text-gray-400">Need to signin :(</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import ChatBox from "../components/ChatBox.vue"
import { useAuth } from "../hooks/useAuth"

const authStore = useAuth()
const { isLogin } = storeToRefs(authStore)
</script>

<style scoped></style>
