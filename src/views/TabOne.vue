<template>
	<div>
		<post-table />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import PostTable from "@/components/PostTable.vue";

export default Vue.extend({
	data() {
		return {};
	},
	components: {
		PostTable,
	},
	computed: {
		...mapGetters({
			posts: "getPosts",
			snackbar: "getSnackbar",
			snackbarMessage: "getSnackbarMessage",
		}),
	},
	methods: {
		...mapActions({
			loadPosts: "loadPosts",
		}),
	},
	async mounted() {
		if (this.posts.length === 0) {
			await this.loadPosts();
		}
	},
});
</script>

<style scoped></style>
