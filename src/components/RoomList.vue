<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="room in roomList"
      :key="room.id"
      class="p-2 border hover:bg-gray-100 cursor-pointer mt-2 rounded-md"
      :class="{ 'bg-gray-100': $route.params.roomId === room.id }"
      @click="emit('toggle', room)"
    >
      <div>{{ room.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const roomList = ref([
  {
    id: "doglover",
    title: "💬 Dog Lover 🐾",
  },
  {
    id: "catlover",
    title: " 💬 Cat Lover 🐈",
  },
])

const emit = defineEmits(["toggle"])
</script>

<style scoped></style>
