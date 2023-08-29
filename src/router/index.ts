import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/signin",
      component: () => import("../views/Signin.vue"),
      meta: {
        requiredUnAuth: true,
      },
    },
    {
      path: "/signup",
      component: () => import("../views/Signup.vue"),
      meta: {
        requiredUnAuth: true,
      },
    },
    {
      path: "/chat/:roomId",
      component: () => import("../views/Chat.vue"),
    },
    {
      path: "/profile",
      component: () => import("../views/Profile.vue"),
    },
  ],
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredUnAuth)) {
    if (await getCurrentUser()) {
      alert("you dont have access")
      next("/")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
