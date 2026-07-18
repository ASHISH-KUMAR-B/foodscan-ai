import { useQuery } from "@tanstack/react-query";
import { getScanStats } from "../api/historyApi.js";

export const useScanStatsQuery = () => {
  return useQuery({ queryKey: ["scanStats"], queryFn: getScanStats });
};