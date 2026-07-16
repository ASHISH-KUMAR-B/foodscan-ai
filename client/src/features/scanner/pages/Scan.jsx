import { useState } from "react";

import Card from "../../../components/common/Card";
import ImageUploader from "../../../components/ImageUploader";

import ScanPreview from "../components/ScanPreview";

import { useScanMutation } from "../hooks/useScanMutation";

export default function Scan() {
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState("");
	const [result, setResult] = useState(null);

	const { mutate, isPending } = useScanMutation();

	const handleImageSelect = (file) => {
		if (!file) return;

		setImage(file);
		setPreview(URL.createObjectURL(file));
		setResult(null);
	};

	const handleAnalyze = () => {
		if (!image) return;

		const formData = new FormData();
		formData.append("image", image);

		mutate(formData, {
			onSuccess: (response) => {
				console.log("AI Response:", response);

				setResult(response?.data?.data || null);
			},
		});
	};

	const handleRemove = () => {
		if (preview) {
			URL.revokeObjectURL(preview);
		}

		setImage(null);
		setPreview("");
		setResult(null);
	};

	return (
		<div className="mx-auto max-w-3xl p-6">
			<Card className="p-6">
				<h1 className="mb-2 text-3xl font-bold">
					Scan Food Product
				</h1>

				<p className="mb-6 text-slate-600">
					Upload or capture a food package image to analyze ingredients and health information.
				</p>

				<ImageUploader
					onSelect={handleImageSelect}
					accept="image/*"
					capture="environment"
				/>

				<ScanPreview
					preview={preview}
					loading={isPending}
					onAnalyze={handleAnalyze}
					onRemove={handleRemove}
				/>

				{result && (
					<div className="mt-8 space-y-5 rounded-xl bg-slate-50 p-6">

						<h2 className="text-2xl font-bold">
							🤖 Food Analysis
						</h2>

						<div>
							<p>
								<strong>📦 Product:</strong>{" "}
								{result.productName || "Unknown"}
							</p>

							<p>
								<strong>🏢 Brand:</strong>{" "}
								{result.brand || "Unknown"}
							</p>

							<p>
								<strong>❤️ Health Score:</strong>{" "}
								{result.healthScore || 0}/100
							</p>
						</div>


						<div>
							<h3 className="font-semibold text-lg">
								🥣 Ingredients
							</h3>

							<ul className="list-disc pl-6">
								{result.ingredients?.length ? (
									result.ingredients.map((item, index) => (
										<li key={index}>
											{item}
										</li>
									))
								) : (
									<li>No ingredients detected</li>
								)}
							</ul>
						</div>


						<div>
							<h3 className="font-semibold text-lg">
								⚠ Allergens
							</h3>

							<ul className="list-disc pl-6">
								{result.allergens?.length ? (
									result.allergens.map((item, index) => (
										<li key={index}>
											{item}
										</li>
									))
								) : (
									<li>No allergens detected</li>
								)}
							</ul>
						</div>


						<div>
							<h3 className="font-semibold text-lg">
								💡 Health Tips
							</h3>

							<ul className="list-disc pl-6">
								{result.tips?.length ? (
									result.tips.map((item, index) => (
										<li key={index}>
											{item}
										</li>
									))
								) : (
									<li>No tips available</li>
								)}
							</ul>
						</div>


						<div>
							<h3 className="font-semibold text-lg">
								🍎 Nutrition
							</h3>

							<p>
								Calories: {result.nutrition?.calories || "N/A"}
							</p>

							<p>
								Protein: {result.nutrition?.protein || "N/A"}
							</p>

							<p>
								Fat: {result.nutrition?.fat || "N/A"}
							</p>

							<p>
								Carbohydrates: {result.nutrition?.carbohydrates || "N/A"}
							</p>

							<p>
								Sugar: {result.nutrition?.sugar || "N/A"}
							</p>
						</div>

					</div>
				)}

			</Card>
		</div>
	);
}