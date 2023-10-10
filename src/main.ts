import "element-plus/theme-chalk/src/message.scss";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import "uno.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
// import routes from '~pages';

import "~/styles/index.scss";
import "~/styles/index.css";
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import App from "./App.vue";

const routes = setupLayouts(generatedRoutes)


const router = createRouter({
    routes,
    history: createWebHistory(),
})

const pinia = createPinia()

pinia.use(createPersistedState({
    auto: true,
}))


const app = createApp(App);
app.use(ElementPlus);
app.use(router)
app.use(pinia)
app.mount("#app");
