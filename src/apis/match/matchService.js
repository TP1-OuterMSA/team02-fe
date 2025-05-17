import {axiosInstance} from "@apis/axiosInstance.js";


export const saveMealPost = async (mealPost) => {
  const  response = await axiosInstance.post('/match/save', mealPost);
  return response.data;
}


const matchService = {
  saveMealPost,
}

export default matchService;