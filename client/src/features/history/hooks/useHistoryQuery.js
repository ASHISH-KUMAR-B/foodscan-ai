import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../api/historyApi";

export const useHistoryQuery = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });
};