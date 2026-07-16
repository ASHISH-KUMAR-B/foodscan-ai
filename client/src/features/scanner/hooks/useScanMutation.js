import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { analyzeImage } from "../api/scannerApi";

export const useScanMutation = () => {
	return useMutation({
		mutationFn: analyzeImage,

		onSuccess: () => {
			toast.success("Food analysis completed successfully.");
		},

		onError: (error) => {
			toast.error(
				error?.response?.data?.message ||
				"Food analysis failed."
			);
		},
	});
};