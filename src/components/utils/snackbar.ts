import { Store } from "vuex";

interface SnackbarState {
	message: string;
	isVisible: boolean;
}

interface RootState {
	snackbar: SnackbarState;
}

export function showSnackbar(
	store: Store<RootState>,
	message: string,
	duration = 3000
) {
	store.commit("SET_SNACKBAR_MESSAGE", message);
	store.commit("SET_SNACKBAR", true);

	setTimeout(() => {
		store.commit("SET_SNACKBAR", false);
	}, duration);
}
