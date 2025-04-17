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

const dietService = {
  getDietDate,
  getDiets,
}

export default dietService;