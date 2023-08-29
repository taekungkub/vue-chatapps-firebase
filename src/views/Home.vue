<template>
  <div>
    <RoomList @toggle="(room) => $router.push('/chat/' + room.id)" />
  </div>
</template>

<script setup lang="ts">
import RoomList from "../components/RoomList.vue"
</script>

<style scoped></style>
