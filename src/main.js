import {createApp} from "vue";
import App from "./App.vue";
import store from "./store";
import { router } from './router'
import VueClickAway from "vue3-click-away";

// Vue.config.productionTip = false;

// new Vue({
// 	store,
// 	router,
// 	render: (h) => h(App),
// }).$mount("#app");

const app = createApp(App);

app.use(VueClickAway) // Makes 'v-click-away' directive usable in every component
app.use(router)
app.use(store)
app.mount('#app')

