import axios from "axios";

export const getPosts = async () => {
	try {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		);
		return response.data;
	} catch (error) {
		console.error("Error sending posts:", error);
		throw error;
	}
};

export const sendFile = async (formData: FormData) => {
	try {
		const response = await axios.post(
			"https://api.escuelajs.co/api/v1/files/upload",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error sending file:", error);
		throw error;
	}
};
