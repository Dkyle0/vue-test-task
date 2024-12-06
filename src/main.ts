import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ModalWindow from "@/components/ModalWindow.vue";

Vue.component("ModalWindow", ModalWindow);

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	store,
	render: (h) => h(App),
}).$mount("#app");
