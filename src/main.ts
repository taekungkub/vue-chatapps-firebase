import { createApp } from "vue"
import "./style.css"
import { VueFire, VueFireAuth } from "vuefire"
import router from "./router"
import App from "./App.vue"
import { firebaseApp } from "./services/firebase"
import { createPinia } from "pinia"

const pinia = createPinia()

const app = createApp(App)
app.use(router)

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})
app.use(pinia)

app.mount("#app")
