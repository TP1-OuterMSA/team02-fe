import {axiosInstance} from "@apis/axiosInstance.js";

const GT_PREFIX = import.meta.env.VITE_GT_SERVICE_PREFIX;

export const getRecommendKcal = async () => {
  const response = await axiosInstance.get(`${GT_PREFIX}/user/getRecommendKcal`);
  return response.data;
}

export const updateRecommendKcal = async (kcal) => {
  const response = await axiosInstance.patch(`${GT_PREFIX}/user/updateKcal`, {}, {
    params: {kcal}
  });
  return response.data;
}

export const getMyUserId  = async () => {
  const response  = await axiosInstance.get(`${GT_PREFIX}/user/getMyId`);
  return response.data;
}
const userService = {
  getRecommendKcal,
  updateRecommendKcal,
  getMyUserId,
}

export default  userService;