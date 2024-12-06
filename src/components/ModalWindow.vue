<template>
	<v-dialog persistent v-model="confirmDeleteDialog" width="400">
		<v-card>
			<v-card-title class="headline">Confirm Deletion</v-card-title>
			<v-card-text> Are you sure to delete this post? </v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="cancel">
					Cancel
				</v-btn>
				<v-btn color="red darken-1" text @click="confirm">
					Delete
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
		postIndex: {
			type: Number,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			confirmDeleteDialog: this.visible,
		};
	},
	watch: {
		visible(val: boolean) {
			this.confirmDeleteDialog = val;
		},
		confirmDeleteDialog(val: boolean) {
			this.$emit("update:visible", val);
		},
	},
	methods: {
		cancel() {
			this.$emit("cancel");
		},
		confirm() {
			this.$emit("confirm", this.postIndex);
		},
	},
});
</script>
