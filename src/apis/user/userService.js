import {axiosInstance} from "@apis/axiosInstance.js";

export const updateRecommendKcal = async (kcal) => {
  const response = await axiosInstance.patch('/user/updateKcal', {}, {
    params: {kcal}
  });
  return response.data;
}

const userService = {
  updateRecommendKcal,
}

export default  userService;