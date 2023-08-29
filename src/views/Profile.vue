<template>
  <div>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "../hooks/useAuth"
import { storeToRefs } from "pinia"

const authStore = useAuth()
const { user } = storeToRefs(authStore)
</script>

<style scoped></style>
