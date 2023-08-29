<template>
  <div>
    <div ref="chatContainer" @scroll="() => handleScroll(roomId)" class="bg-blue-50 w-full h-[40vh] overflow-auto p-3">
      <Message v-for="{ id, text, userPhotoURL, userName, userId } in messagesFilter" :key="id" :name="userName" :sender="userId === user?.uid">
        {{ text }}
      </Message>

      <div ref="bottom"></div>
    </div>

    <form @submit.prevent="handleSend" class="bg-blue-200 p-3 w-full">
      <div class="flex items-center gap-4">
        <div class="w-full">
          <input v-model="text" type="text" class="bg-white rounded-xl w-full p-3" />
        </div>
        <div>
          <button type="submit" class="bg-blue-400">Send</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import Message from "../components/Message.vue"
import useChat from "../hooks/useChat"
import { useAuth } from "../hooks/useAuth"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

const text = ref()
const bottom = ref<HTMLElement | null>(null)

const route = useRoute()
const authStore = useAuth()
const { onSend, messagesFilter, subscribeToMessages, unsubscribeFromMessages, chatContainer, handleScroll, scrollToBottom } = useChat()
const { user } = storeToRefs(authStore)

const roomId = computed(() => route.params.roomId as string)

const messagesSort = computed(() => {
  return messagesFilter.value.sort((a: any, b: any) => a.createdAt - b.createdAt)
})

/*
 scroll เลื่อนลงข้างล่างตอนมีข้อความใหม่
*/

// watch(
//   () => messagesFilter,
//   () => {
//     nextTick(() => {
//       bottom.value?.scrollIntoView({ behavior: "smooth" })
//     })
//   },
//   { deep: true }
// )

async function handleSend() {
  if (!user.value) return
  await onSend({ roomId: roomId.value, message: text.value, user: user.value })
  text.value = ""
}
</script>

<style scoped></style>
