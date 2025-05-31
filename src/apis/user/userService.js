import {axiosInstance} from "@apis/axiosInstance.js";

export const getRecommendKcal = async () => {
  const response = await axiosInstance.get('/user/getRecommendKcal');
  return response.data;
}

export const updateRecommendKcal = async (kcal) => {
  const response = await axiosInstance.patch('/user/updateKcal', {}, {
    params: {kcal}
  });
  return response.data;
}

export const getMyUserId  = async () => {
  const response  = await axiosInstance.get('/user/getMyId');
  return response.data;
}
const userService = {
  getRecommendKcal,
  updateRecommendKcal,
  getMyUserId,
}

export default  userService;