import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteHistoryItem } from "../api/historyApi";

export const useDeleteHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHistoryItem,
    onSuccess: () => {
      toast.success("Scan deleted.");
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete scan.");
    },
  });
};