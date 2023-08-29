import { addDoc, collection, endBefore, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, startAfter } from "firebase/firestore"
import { ref as databaseRef, getDatabase } from "firebase/database"
import { UserTy } from "../types/type"
import { computed, onUnmounted, ref, watchEffect } from "vue"
import { firebaseApp } from "../services/firebase"
import { useRoute } from "vue-router"

export default function useChat() {
  const dbFireStore = getFirestore(firebaseApp)
  const dbRTDB = getDatabase(firebaseApp)

  // const numbersRef = databaseRef(dbRTDB, "numbers")
  // const numberList = useDatabaseList(numbersRef)

  const messagesFilter = ref([])
  let unsubscribe = null as any
  const itemsPerPage = 10
  const oldestMessageTimestamp = ref(null)
  const lastMessageTimestamp = ref(null)
  const chatContainer = ref<HTMLElement | null>(null)
  const route = useRoute()
  const roomId = computed(() => route.params.roomId as string)
  let timer: any

  const subscribeToMessages = async (roomId: string) => {
    const messagesCollection = collection(dbFireStore, "chat-rooms", roomId, "messages")
    const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"), limit(itemsPerPage))

    unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      messagesFilter.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse() as any

      if (querySnapshot.docs.length > 0) {
        oldestMessageTimestamp.value = querySnapshot.docs[querySnapshot.docs.length - 1].data().createdAt
      }
      timer = setTimeout(() => scrollToBottom(), 10)
    })
  }

  /*
    User has scrolled to the top, load more messages
  */
  const handleScroll = (roomId: string) => {
    const scrollPosition = chatContainer.value?.scrollTop
    const containerHeight = chatContainer.value?.clientHeight
    const contentHeight = chatContainer.value?.scrollHeight

    if (Number(scrollPosition) === 0) {
      // to top
      loadOlderMessages(roomId)
    }

    if (Number(scrollPosition) + Number(containerHeight) >= Number(contentHeight)) {
      // to bottom
    }
  }

  const loadOlderMessages = (roomId: string) => {
    console.log("load more")
    const messagesCollection = collection(dbFireStore, "chat-rooms", roomId, "messages")
    const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"), startAfter(oldestMessageTimestamp.value), limit(itemsPerPage))
    getDocs(messagesQuery).then((querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse() as any

      if (querySnapshot.docs.length > 0) {
        oldestMessageTimestamp.value = querySnapshot.docs[querySnapshot.docs.length - 1].data().createdAt
        messagesFilter.value = result.concat(messagesFilter.value) // Prepend old messages

        /*
        ให้ scroll ไม่เลื่อนไปบนสุดเวลาเพิ่ม old message
        */
        const containerHeight = chatContainer.value?.clientHeight
        const contentHeight = chatContainer.value?.scrollHeight
        const offset = Number(contentHeight) / Number(contentHeight)
        if (chatContainer.value) {
          chatContainer.value.scrollTop = offset
        }
      }
    })
  }

  onUnmounted(() => {
    unsubscribeFromMessages()
  })

  const unsubscribeFromMessages = () => {
    if (unsubscribe) {
      unsubscribe()
      messagesFilter.value = []
      clearTimeout(timer)
    }
  }

  /*
 เปลี่ยนห้องแชท
  */
  watchEffect(() => {
    unsubscribeFromMessages() // Unsubscribe from previous room
    subscribeToMessages(roomId.value) // Subscribe to current room
  })

  const scrollToBottom = () => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }

  /*
  ส่งข้อความ
  */
  async function onSend({ roomId, message, user }: { roomId: string; message: string; user: UserTy }) {
    try {
      if (!message) return
      const messagesRef = collection(dbFireStore, "chat-rooms", roomId, "messages")
      await addDoc(messagesRef, {
        userId: user.uid,
        userName: user.email,
        text: message,
        createdAt: serverTimestamp(),
      })
      scrollToBottom()
    } catch (error) {
      console.log(error)
    }
  }
  return {
    onSend,
    messagesFilter,
    subscribeToMessages,
    unsubscribeFromMessages,
    chatContainer,
    handleScroll,
    scrollToBottom,
  }
}
