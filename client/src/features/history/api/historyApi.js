import api from "../../../api/axios";
import { ENDPOINTS } from "../../../api/endpoints";

export const getHistory = async () => {
  const { data } = await api.get(ENDPOINTS.HISTORY);
  return data;
};

export const getHistoryById = async (id) => {
  const { data } = await api.get(`${ENDPOINTS.HISTORY}/${id}`);
  return data;
};

export const deleteHistoryItem = async (id) => {
  const { data } = await api.delete(`${ENDPOINTS.HISTORY}/${id}`);
  return data;
};