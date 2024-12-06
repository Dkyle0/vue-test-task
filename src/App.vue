<template>
	<v-app>
		<v-app-bar app dark class="custom-toolbar">
			<v-tabs v-model="activeTab" class="custom-tabs">
				<v-tab to="/one">Tab One</v-tab>
				<v-tab to="/two">Tab Two</v-tab>
			</v-tabs>
		</v-app-bar>
		<v-main>
			<router-view :key="$route.fullPath" />
			<v-snackbar v-model="snackbar" :timeout="3000">{{
				snackbarMessage
			}}</v-snackbar>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Route } from "vue-router";

export default Vue.extend({
	data() {
		return {
			activeTab: this.$route.path,
		};
	},
	computed: {
		...mapGetters({
			snackbarMessage: "getSnackbarMessage",
		}),
		snackbar: {
			get() {
				return this.$store.getters.getSnackbar;
			},
			set(value: boolean) {
				this.$store.commit("SET_SNACKBAR", value);
			},
		},
	},
	watch: {
		$route(to: Route) {
			this.activeTab = to.path;
		},
	},
});
</script>

<style scoped></style>
