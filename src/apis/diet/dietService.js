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

export const getFoods = async ({count = 5, foodName}) => {
  const response = await axiosInstance.get('/diet/getFoods', {
    params: {count, foodName}
  });
  return response.data;
}

export const getSchoolMeal = async ({date, mealType}) => {
  const response = await axiosInstance.get('/diet/getSchoolMeal', {
    params: {date, mealType}
  });
  return response.data;
}

export const saveDiet = async ({date, mealType, foods}) => {
  const response = await axiosInstance.post("/diet/saveDiet", {date, mealType,foods});
  return response.data;
}

export const deleteDiet = async ({dietId, foodIds}) => {
  const response = await axiosInstance.delete(`/diet/deleteDietFoods`,
    {
      params: {dietId},
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