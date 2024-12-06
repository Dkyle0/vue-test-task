import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/one",
		name: "One",
		component: () => import("@/views/TabOne.vue"),
	},
	{
		path: "/two",
		name: "Two",
		component: () => import("@/views/TabTwo.vue"),
	},
	{ path: "*", redirect: "/one" },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
