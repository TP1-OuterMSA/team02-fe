import {axiosInstance} from "@apis/axiosInstance.js";

const GT_PREFIX = import.meta.env.VITE_GT_SERVICE_PREFIX;

export const getDiets = async (date) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/diet/getDiets`, {
    params: {date}
  });
  return response.data;
}

export const getDietDate = async (month) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/diet/getDietDates`, {
    params: {month}
  });
  return response.data;
}

export const getFoods = async ({count = 5, foodName}) => {
  const response = await axiosInstance.get('/diet/getFoods', { // 여기엔 유저정보 없음
    params: {count, foodName}
  });
  return response.data;
}

export const getSchoolMeal = async ({date, mealType}) => {
  const response = await axiosInstance.get('/diet/getSchoolMeal', { // 여기엔 유저정보 없음
    params: {date, mealType}
  });
  return response.data;
}

export const saveDiet = async ({date, mealType, foods}) => {
  const response = await axiosInstance.post(`${GT_PREFIX}/diet/saveDiet`, {date, mealType,foods});
  return response.data;
}

export const deleteDiet = async ({dietFoodId, foodIds}) => {
  const response = await axiosInstance.delete(`${GT_PREFIX}/diet/deleteDietFood`,
    {
        params: {dietFoodId},
      data: {foodIds}
    }
  );
  return response.data;
}

const dietService = {
  getDietDate,
  getDiets,
  getSchoolMeal,
  getFoods,
  saveDiet,
  deleteDiet,
}

export default dietService;