import api from "../../../api/axios";
import { ENDPOINTS } from "../../../api/endpoints";

export const analyzeImage = async (formData) => {
  const { data } = await api.post(
    ENDPOINTS.AI_ANALYZE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

  export const getAIInsights = async (scanId) => {
  const { data } = await api.post(`/ai/insights/${scanId}`);
  return data;
  };