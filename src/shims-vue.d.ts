declare module "*.vue" {
	import { DefineComponent } from "vue";
	const component: DefineComponent<Record<string, any>, {}, any>;
	export default component;
}

import { Store } from "vuex";
import { RootState } from "@/types/store";

declare module "vue/types/vue" {
	interface Vue {
		$store: Store<RootState>;
	}
}
