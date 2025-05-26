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
  const response = await axiosInstance.get('/match/getPlaces', {
    params:{"nw-longitude":nwLongitude,"nw-latitude": nwLatitude,"se-longitude": seLongitude,"se-latitude": seLatitude}
  });
  return response.data;
}

export const getMealMateOffers = async ({mealPostId, cursor=0, count = 5}) => {
  const response = await axiosInstance.get('/match/getOffers', {
    params: {mealPostId, cursor, count}
  });
  return response.data;
}

const matchService = {
  saveMealPost,
  getMealPost,
  getPlaces,
  getMealMateOffers,
}

export default matchService;