import {axiosInstance} from "@apis/axiosInstance.js";


export const saveMealPost = async (mealPost) => {
  const  response = await axiosInstance.post('/match/save', mealPost);
  return response.data;
}

export const offerMealMateMatch = async ({mealPostId, content}) => {
  const response = await axiosInstance.post(`/match/offer/${mealPostId}`, {}, {
    params: {content}
  });
  return response.data;
}

export const replyMealMateOffer = async ({mealMateOfferId, matchState}) => {
  const response = await axiosInstance.patch(`match/reply/${mealMateOfferId}`, {}, {
    params: {matchState}
    }
  )
  return response.data;
}

export const deleteMatchPost = async ({postId}) => {
  const response = await axiosInstance.delete(`/match/deletePost/${postId}`);
  return response.data;
}

export const updateMatchPost = async ({postId, content, schedule}) => {
  const response = await axiosInstance.patch(`/match/updatePost/${postId}`,
    {content, schedule}
  );
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
  offerMealMateMatch,
  replyMealMateOffer,
  deleteMatchPost,
  updateMatchPost,
  getMealPost,
  getPlaces,
  getMealMateOffers,
}

export default matchService;