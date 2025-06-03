import {axiosInstance} from "@apis/axiosInstance.js";

const GT_PREFIX =  import.meta.env.VITE_ABSOLUTE_URL + "/api/team06-api-gateway";

export const saveComments = async ({postId, content}) => {
  const response = await axiosInstance.post(`${GT_PREFIX}/comment/add/${postId}`, {content});
  return response.data;
}

export const updateComment = async ({commentId, content}) => {
  const response = await axiosInstance.patch(`${GT_PREFIX}/comment/update/${commentId}`, {content});
  return response.data;
}

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`${GT_PREFIX}/comment/delete/${commentId}`);
  return response.data;
}

export const likeComment = async (commentId) => {
  const response = await axiosInstance.post(`${GT_PREFIX}/community/comment/like/${commentId}`);
  return response.data;
}

export const unlikeComment = async (commentId) => {
  const response = await axiosInstance.post(`${GT_PREFIX}/community/comment/unlike/${commentId}`);
  return response.data;
}

const commentService = {
  saveComments,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
}

export default commentService;