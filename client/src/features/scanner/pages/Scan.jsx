import { useState } from "react";
import api from "../../../api/axios";
import { ENDPOINTS } from "../../../api/endpoints";
import ImageUploader from "../../../components/ImageUploader";
import Button from "../../../components/common/Button.jsx";
import Card from "../../../components/common/Card.jsx";
import { handleApiError } from "../../../utils/errorHandler.js";

export default function Scan() {
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleImageSelect = (file) => {
		setImage(file);
		setPreview(URL.createObjectURL(file));
		setMessage("");
	};

	const uploadImage = async () => {
		if (!image) {
			setMessage("Please select an image.");
			return;
		}

		const formData = new FormData();
		formData.append("image", image);

		try {
			setLoading(true);

			const response = await api.post(ENDPOINTS.IMAGE_UPLOAD, formData);

			setMessage(response.data?.message || "Image uploaded successfully.");
		} catch (error) {
			handleApiError(error);
			setMessage(error.response?.data?.message || "Upload failed.");
		} finally {
			setLoading(false);
		}
	};

	const removeImage = () => {
		setImage(null);
		setPreview("");
		setMessage("");
	};

	return (
		<div className="mx-auto max-w-xl p-6">
			<Card className="p-6">
				<h1 className="mb-6 text-3xl font-bold">Scan Product</h1>

				<ImageUploader onSelect={handleImageSelect} />

				{preview && (
					<div className="mt-6 space-y-4">
						<img
							src={preview}
							alt="Preview"
							className="max-h-96 w-full rounded-xl object-cover shadow"
						/>

						<div className="flex gap-3">
							<Button type="button" onClick={uploadImage} disabled={loading}>
								{loading ? "Uploading..." : "Upload"}
							</Button>

							<Button type="button" className="bg-red-500 hover:bg-red-600" onClick={removeImage}>
								Remove
							</Button>
						</div>
					</div>
				)}

				{message && (
					<p className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
						{message}
					</p>
				)}
			</Card>
		</div>
	);
}

