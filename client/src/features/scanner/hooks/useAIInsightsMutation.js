import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getAIInsights } from "../api/scannerApi";

export const useAIInsightsMutation = () => {
  return useMutation({
    mutationFn: getAIInsights,
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "AI insights are unavailable right now."
      );
    },
  });
};