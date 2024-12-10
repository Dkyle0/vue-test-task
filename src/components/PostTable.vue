<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="posts"
			:items-per-page="localPagination.itemsPerPage"
			:page="localPagination.page"
			@update:page="localPagination.page = $event"
			@update:items-per-page="localPagination.itemsPerPage = $event"
			item-key="id"
			disable-sort
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title class="mr-2">Posts</v-toolbar-title>
					<v-btn small icon outlined @click="openNewPostDrawer">
						<v-icon dark> mdi-plus </v-icon>
					</v-btn>
				</v-toolbar>
			</template>

			<template v-slot:item="{ item, index }">
				<tr @click="openPostDrawer(index)">
					<td>{{ item.id }}</td>
					<td>{{ item.title }}</td>
					<td>{{ item.body }}</td>
					<td>
						<v-btn
							small
							icon
							outlined
							@click.stop="
								openDialog(
									calculateSelectedPostIndex(
										index,
										localPagination.page,
										localPagination.itemsPerPage
									)
								)
							"
						>
							<v-icon dark> mdi-minus </v-icon>
						</v-btn>
					</td>
				</tr>
			</template>
		</v-data-table>

		<PostDrawer />

		<ModalWindow
			:visible="isDialogVisible"
			:postIndex="postToDeleteIndex"
			@cancel="closeDialog"
			@confirm="deletePost"
		/>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import PostDrawer from "@/components/PostDrawer.vue";
import { showSnackbar } from "@/components/utils/snackbar";

export default Vue.extend({
	data() {
		return {
			headers: [
				{ text: "ID", key: "id" },
				{ text: "Title", align: "start", key: "title" },
				{ text: "Body", align: "start", key: "body" },
				{ text: "Delete post", align: "start", key: "dell" },
			],
			localPagination: {
				page: 2,
				itemsPerPage: 5,
			},
			isDialogVisible: false,
			postToDeleteIndex: null as number | null,
		};
	},
	components: {
		PostDrawer,
	},
	computed: {
		...mapGetters({
			posts: "getPosts",
			page: "getPage",
			itemsPerPage: "getItemsPerPage",
		}),
	},
	mounted() {
		this.localPagination.page = this.page;
		this.localPagination.itemsPerPage = this.itemsPerPage;
	},
	methods: {
		openPostDrawer(index: number) {
			const selectedPostIndex = this.calculateSelectedPostIndex(
				index,
				this.localPagination.page,
				this.localPagination.itemsPerPage
			);

			this.setSelectedPost({
				...this.posts[selectedPostIndex],
				index: selectedPostIndex,
			});
			this.setDrawers(true);
		},
		openNewPostDrawer() {
			this.setSelectedPost({
				index: this.posts.length,
				id: Number(Date.now()),
				title: "",
				userId: 1,
				body: "",
			});
			this.setDrawers(true);
		},
		calculateSelectedPostIndex(
			index: number,
			page: number,
			itemPerPage: number
		) {
			return index + (page - 1) * itemPerPage;
		},
		openDialog(index: number) {
			this.setDrawers(false);
			this.postToDeleteIndex = index;
			this.isDialogVisible = true;
		},
		closeDialog() {
			this.isDialogVisible = false;
			this.postToDeleteIndex = null;
		},
		deletePost(index: number) {
			if (index !== null) {
				this.removePost(index);
				showSnackbar(this.$store, "Post has been deleted");
			}
			this.closeDialog();
		},

		...mapMutations({
			setPage: "SET_PAGE",
			setDrawers: "SET_DRAWERS",
			setSelectedPost: "SET_SELECTED_POST",
			setItemsPerPage: "SET_ITEMS_PER_PAGE",
			removePost: "REMOVE_POST",
		}),
	},
	watch: {
		"localPagination.page"(newPage) {
			this.setPage(newPage);
		},
		"localPagination.itemsPerPage"(newItemsPerPage) {
			this.setItemsPerPage(newItemsPerPage);
		},
	},
});
</script>

<style></style>
