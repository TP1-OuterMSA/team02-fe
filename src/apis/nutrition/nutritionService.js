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

export const getDayNutrition = async ({startDate, endDate}) => {
  const response = await axiosInstance.get("/diet/analyzeDay", {
    params: {startDate, endDate}
  });
  return response.data;
}

const nutritionService = {
  analyzeNutrition,
  getWeekNutrition,
  getDayNutrition,
}

export default nutritionService;