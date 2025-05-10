import {axiosInstance} from "@apis/axiosInstance.js";

export const analyzeNutrition = async (date) => {
  const response = await axiosInstance.get("/diet/analyze", {
    params: {date}
  });
  return response.data;
}

const nutritionService = {
  analyzeNutrition
}

export default nutritionService;