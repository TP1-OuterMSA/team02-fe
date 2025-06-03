import {axiosInstance} from "@apis/axiosInstance.js";

const GT_PREFIX = import.meta.env.VITE_ABSOLUTE_URL + "/api/team06-api-gateway/api/team2";

export const saveMealPost = async (mealPost) => {
  const  response = await axiosInstance.post(`${GT_PREFIX}/match/save`, mealPost);
  return response.data;
}

export const offerMealMateMatch = async ({mealPostId, content}) => {
  const response = await axiosInstance.post(`${GT_PREFIX}/match/offer/${mealPostId}`, {}, {
    params: {content}
  });
  return response.data;
}

export const replyMealMateOffer = async ({mealMateOfferId, matchState}) => {
  const response = await axiosInstance.patch(`${GT_PREFIX}/match/reply/${mealMateOfferId}`, {}, {
    params: {matchState}
    }
  )
  return response.data;
}

export const deleteMatchPost = async ({postId}) => {
  const response = await axiosInstance.delete(`${GT_PREFIX}/match/deletePost/${postId}`);
  return response.data;
}

export const updateMatchPost = async ({postId, content, schedule}) => {
  const response = await axiosInstance.patch(`${GT_PREFIX}/match/updatePost/${postId}`,
    {content, schedule}
  );
  return response.data;
}
export const getMealPost = async ({address, cursor, count = 5}) => {
  const response = await axiosInstance.get('/match/getPosts', { // 여기엔 유저정보 없음
    params: {address, cursor, count}
    }
  )
  return response.data;
}

export const getPlaces = async ({nwLongitude, nwLatitude, seLongitude, seLatitude}) => {
  const response = await axiosInstance.get('/match/getPlaces', { // 여기엔 유저정보 없음
    params:{"nw-longitude":nwLongitude,"nw-latitude": nwLatitude,"se-longitude": seLongitude,"se-latitude": seLatitude}
  });
  return response.data;
}

export const getMealMateOffers = async ({mealPostId, cursor=0, count = 5}) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/match/getOffers`, {
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