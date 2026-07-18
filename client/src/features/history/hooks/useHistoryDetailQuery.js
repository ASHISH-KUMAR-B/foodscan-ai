import { useQuery } from "@tanstack/react-query";
import { getHistoryById } from "../api/historyApi";

export const useHistoryDetailQuery = (id) => {
  return useQuery({
    queryKey: ["history", id],
    queryFn: () => getHistoryById(id),
    enabled: Boolean(id),
  });
};