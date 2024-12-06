<template>
	<v-navigation-drawer width="40%" v-model="params.drawers" app>
		<v-form class="drawer-container" @submit.prevent="savePost">
			<v-text-field v-model="localSelectedPost.title" label="Title" />
			<v-text-field v-model="localSelectedPost.userId" label="UserId" />
			<v-textarea v-model="localSelectedPost.body" label="Body" />
			<div class="btn-container">
				<v-btn dark @click="closeDrawer">Cancel</v-btn>
				<v-btn @click="savePost(localSelectedPost)">Save</v-btn>
			</div>
		</v-form>
	</v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import { ISelectedPost } from "@/types/store";
import { showSnackbar } from "@/components/utils/snackbar";

export default Vue.extend({
	name: "PostDrawer",
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			localSelectedPost: "getSelectedPost",
			params: "getParams",
		}),
	},
	methods: {
		async savePost(updatedPost: ISelectedPost) {
			let snackbarMessage = "";
			try {
				const { index, ...post } = updatedPost;
				await this.setPost({ index, post });
				snackbarMessage = "Post saved successfully";
			} catch (error) {
				snackbarMessage = "Failed to save post";
			} finally {
				showSnackbar(this.$store, snackbarMessage);
				this.setDrawers(false);
			}
		},
		closeDrawer() {
			showSnackbar(this.$store, "Сancelled");
			this.setDrawers(false);
		},
		...mapMutations({
			setPost: "SET_POST",
			setDrawers: "SET_DRAWERS",
		}),
	},
});
</script>

<style scoped>
.drawer-container {
	margin: 1%;
}

.btn-container {
	display: flex;
	justify-content: space-between;
}
</style>
