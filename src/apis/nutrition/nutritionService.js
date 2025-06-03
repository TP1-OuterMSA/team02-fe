import {axiosInstance} from "@apis/axiosInstance.js";

const GT_PREFIX = import.meta.env.VITE_ABSOLUTE_URL + "/api/team06-api-gateway";

export const analyzeNutrition = async (date) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/diet/analyze`, {
    params: {date}
  });
  return response.data;
}

export const getWeekNutrition = async ({date, count = 7}) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/diet/weekly-nutrition`, {
    params: {date, count}
  });
  return response.data;
}

export const getDayNutrition = async ({startDate, endDate}) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/diet/analyzeDay`, {
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