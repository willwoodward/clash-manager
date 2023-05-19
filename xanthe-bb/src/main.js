import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import './index.css'
import App from './App.vue'
import { firebaseApp } from './firebase'
import router from './router'
import './assets/tailwind.css'
import './assets/main.css'

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faXmark, faHouse, faUsers, faFire, faArrowRight)

const app = createApp(App)
app
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
