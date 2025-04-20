import {axiosInstance} from "@apis/axiosInstance.js";

export const getDiets = async (date) => {
  const response = await axiosInstance.get('/diet/getDiets', {
    params: {date}
  });
  return response.data;
}

export const getDietDate = async (month) => {
  const response = await axiosInstance.get('/diet/getDietDates', {
    params: {month}
  });
  return response.data;
}

export const getFoods = async ({pageNo = 1, pageSize = 2, foodName}) => {
  const response = await axiosInstance.get('/diet/getFoods', {
    params: {pageNo, pageSize, foodName}
  });
  return response.data;
}

export const saveDiet = async ({date, mealType, foods}) => {
  const response = await axiosInstance.post("/diet/saveDiet", {date, mealType,foods});
  return response.data;
}

const dietService = {
  getDietDate,
  getDiets,
  getFoods,
  saveDiet,
}

export default dietService;