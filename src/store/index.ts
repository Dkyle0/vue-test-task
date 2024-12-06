import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { getPosts } from "@/services/api";
import { RootState, IPost } from "@/types/store";

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
	state: {
		posts: [],
		pagination: {
			page: 1,
			itemsPerPage: 10,
		},
		selectedPost: {
			index: 0,
			id: 1,
			userId: 1,
			title: "",
			body: "",
		},
		params: {
			drawers: false,
			snackbar: false,
			snackbarMessage: "",
		},
		file: null,
		fileData: {
			isDone: false,
			isUploading: false,
			message: "",
			downloadLink: "",
		},
	},
	mutations: {
		SET_POSTS(state, posts: IPost[]) {
			state.posts = posts;
		},
		SET_POST(state, { index, post }) {
			state.posts.splice(index, 1, post);
		},
		REMOVE_POST(state, index: number) {
			state.posts.splice(index, 1);
		},
		SET_SELECTED_POST(state, post) {
			state.selectedPost = post;
		},
		SET_PAGE(state, page: number) {
			state.pagination.page = page;
		},
		SET_FILE(state, file: File | null) {
			state.file = file;
		},
		SET_FILE_DATA(state, payload: { key: string; data: string | boolean }) {
			state.fileData = { ...state.fileData, [payload.key]: payload.data };
		},
		SET_DRAWERS(state, drawer: boolean) {
			state.params.drawers = drawer;
		},
		SET_SNACKBAR(state, snackbar: boolean) {
			state.params.snackbar = snackbar;
		},
		SET_SNACKBAR_MESSAGE(state, snackbarMessage: string) {
			state.params.snackbarMessage = snackbarMessage;
		},
		SET_ITEMS_PER_PAGE(state, itemsPerPage: number) {
			state.pagination.itemsPerPage = itemsPerPage;
		},
	},
	actions: {
		async loadPosts({ commit }) {
			try {
				const data = await getPosts();
				commit("SET_POSTS", data);
			} catch (error) {
				console.error("Error fetching posts in store:", error);
			}
		},
	},
	getters: {
		getPosts: (state) => state.posts,
		getParams: (state) => state.params,
		getSnackbar: (state) => state.params.snackbar,
		getSnackbarMessage: (state) => state.params.snackbarMessage,
		getSelectedPost: (state) => state.selectedPost,
		getPage: (state) => state.pagination.page,
		getFile: (state) => state.file,
		getFileData: (state) => state.fileData,
		getItemsPerPage: (state) => state.pagination.itemsPerPage,
	},
};

export default new Vuex.Store<RootState>(storeOptions);
