import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Router from "./utils/router";

createApp(App).use(Router).use(createPinia()).mount("#app");
