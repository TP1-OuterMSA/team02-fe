import {axiosInstance} from "@apis/axiosInstance.js";

export const analyzeNutrition = async (date) => {
  const response = await axiosInstance.get("/diet/analyze", {
    params: {date}
  });
  return response.data;
}

export const getWeekNutrition = async ({date, count = 7}) => {
  const response = await axiosInstance.get("/diet/weekly-nutrition", {
    params: {date, count}
  });
  return response.data;
}

const nutritionService = {
  analyzeNutrition,
  getWeekNutrition,
}

export default nutritionService;