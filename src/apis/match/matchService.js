import {axiosInstance} from "@apis/axiosInstance.js";


export const saveMealPost = async (mealPost) => {
  const  response = await axiosInstance.post('/match/save', mealPost);
  return response.data;
}

export const getMealPost = async ({address, cursor, count = 5}) => {
  const response = await axiosInstance.get('/match/getPosts', {
    params: {address, cursor, count}
    }
  )
  return response.data;
}

export const getPlaces = async ({nwLongitude, nwLatitude, seLongitude, seLatitude}) => {
  const response = await axiosInstance.get('/match/getPlaces', {nwLongitude, nwLatitude, seLongitude, seLatitude});
  return response.data;
}


const matchService = {
  saveMealPost,
  getMealPost,
  getPlaces,
}

export default matchService;