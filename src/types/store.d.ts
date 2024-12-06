import { Store } from "vuex";

export interface IPost {
	id: number;
	title: string;
	body: string;
}
export interface ISelectedPost {
	index: number;
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface IPagination {
	page: number;
	itemsPerPage: number;
}
export interface IParams {
	drawers: boolean;
	snackbar: boolean;
	snackbarMessage: string;
}

export interface IFileData {
	isDone: boolean;
	isUploading: boolean;
	message: string;
	downloadLink: string;
}

export type Ifile = File | null;

export interface RootState {
	posts: IPost[];
	pagination: IPagination;
	selectedPost: ISelectedPost;
	params: IParams;
	file: Ifile;
	fileData: IFileData;
}

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$store: Store<RootState>;
	}
}
