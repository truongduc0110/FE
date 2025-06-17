import { createApp } from 'vue'
import './style.css'
import './assets/css/input.css'
import App from './App.vue'
import router from './routers/router'
import { registerGlobalComponents } from "./utils/inport"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, CoFacebookF,BiTwitter  } from "oh-vue-icons/icons";
import { GiCakeSlice,FaArrowRight  } from "oh-vue-icons/icons";
import { createPinia } from 'pinia';
import VueSplide from '@splidejs/vue-splide';

const pinia = createPinia()
addIcons(FaFlag, RiZhihuFill, GiCakeSlice, FaArrowRight, CoFacebookF, BiTwitter);

const app = createApp(App)
registerGlobalComponents(app)

app.use(ElementPlus)
app.use(router)
app.use(VueSplide)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component("v-icon", OhVueIcon);
app.mount('#app')
