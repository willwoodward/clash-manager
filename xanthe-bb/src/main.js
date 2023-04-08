import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import './index.css'
import App from './App.vue'
import { firebaseApp } from './firebase'

const app = createApp(App)
app
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })

app.mount('#app')
