<template>
	<v-container>
		<v-card elevation="6" class="card-container">
			<v-toolbar-title class="page-title">Upload a file</v-toolbar-title>
			<v-file-input
				:disabled="fileData.isUploading || fileData.isDone"
				:loading="fileData.isUploading"
				label="Choose a file"
				v-model="file"
				@change="onFileChange"
			></v-file-input>
			<v-btn
				v-if="file && !fileData.isUploading && !fileData.isDone"
				:disabled="fileData.isUploading"
				color="green"
				@click="uploadFile"
			>
				Upload
			</v-btn>
			<v-btn
				v-if="fileData.isDone && fileData.downloadLink"
				color="red"
				@click="downloadFile"
			>
				Download
			</v-btn>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { showSnackbar } from "@/components/utils/snackbar";
import { sendFile } from "@/services/api";

export default Vue.extend({
	computed: {
		fileData() {
			return this.$store.getters.getFileData;
		},
		file: {
			get() {
				return this.$store.getters.getFile;
			},
			set(file: File | null) {
				this.$store.commit("SET_FILE", file);
			},
		},
	},
	methods: {
		onFileChange() {
			this.$store.commit("SET_FILE_DATA", { key: "isDone", data: false });
			this.$store.commit("SET_FILE_DATA", { key: "message", data: "" });
			this.$store.commit("SET_FILE_DATA", {
				key: "downloadLink",
				data: "",
			});
		},

		async uploadFile() {
			if (!this.file) return;

			const file = this.file as File;
			const formData = new FormData();
			formData.append("file", file);

			this.$store.commit("SET_FILE_DATA", {
				key: "isUploading",
				data: true,
			});
			try {
				const response = await sendFile(formData);
				this.$store.commit("SET_FILE_DATA", {
					key: "isDone",
					data: true,
				});
				this.$store.commit("SET_FILE_DATA", {
					key: "message",
					data: "File uploaded successfully!",
				});
				this.$store.commit("SET_FILE_DATA", {
					key: "downloadLink",
					data: response.location,
				});
			} catch (error) {
				this.$store.commit("SET_FILE_DATA", {
					key: "message",
					data: "Failed to upload file. Please try again.",
				});
			} finally {
				this.$store.commit("SET_FILE_DATA", {
					key: "isUploading",
					data: false,
				});
				showSnackbar(this.$store, this.fileData.message);
			}
		},
		downloadFile() {
			if (this.fileData.downloadLink) {
				const a = document.createElement("a");
				a.href = this.fileData.downloadLink;
				a.target = "_blank";
				a.click();
			}
		},
	},
});
</script>

<style>
.card-container {
	padding: 2%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
