import { ref, onUnmounted, computed } from "vue"
import { createUserWithEmailAndPassword, getAuth, getRedirectResult, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth"
import { useCurrentUser, useFirebaseAuth } from "vuefire"
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth"
import { defineStore } from "pinia"
import { UserTy } from "../types/type"

type AuthTy = "email" | "google"

export const useAuth = defineStore("auth", () => {
  const user = ref<UserTy | null>(null)
  const error = ref(null)

  const auth = useFirebaseAuth()

  const isLogin = computed(() => !!user.value)

  const googleAuthProvider = new GoogleAuthProvider()
  const emailAuthProvider = new EmailAuthProvider()

  async function signIn(type: AuthTy) {
    const auth = useFirebaseAuth()

    if (!auth) return
    if (type === "google") {
      signInWithPopup(auth, googleAuthProvider).catch((reason) => {
        console.error("Failed sign", reason)
        error.value = reason
      })
    }
  }

  async function signupWithEmail(email: string, password: string) {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Successfully")
        console.log("Successfully signup")
      })
      .catch((error) => {
        alert(error)
      })
  }

  async function signinWithEmail(email: string, password: string) {
    if (!auth) return
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user.value = userCredential.user as UserTy
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  function signOut() {
    if (!auth) return
    auth
      .signOut()
      .then(() => {
        console.log("signout")
        user.value = null
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { user, isLogin, signIn, signOut, signinWithEmail, signupWithEmail }
})
