import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Notifications from 'notiwind'
import '@/index.css'
import '@/assets/sass/skeleton.sass'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'animate.css'
import 'cropperjs/dist/cropper.css'

// --- vee-validate v4 ---
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import tw from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { focus, invalidAni, src, timeformat } from '@/utils/directive'
import VueUploadComponent from 'vue-upload-component'

// Globally add all vee-validate rules
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

// Register locale message
configure({
  generateMessage: localize({ zh_TW: tw }),
  validateOnInput: true,
})
setLocale('zh_TW')

// --- app ---
const app = createApp(App)

app.use(router)
app.use(store)
app.use(Notifications)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('FileUpload', VueUploadComponent)
app.directive('focus', focus)
app.directive('invalid', invalidAni)
app.directive('src', src)
app.directive('timeformat', timeformat)

app.mount('#app')
