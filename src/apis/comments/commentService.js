import {axiosInstance} from "@apis/axiosInstance.js";

export const saveComments = async ({postId, content}) => {
  const response = await axiosInstance.post(`/comment/add/${postId}`, {content});
  return response.data;
}

export const updateComment = async ({commentId, content}) => {
  const response = await axiosInstance.patch(`/comment/update/${commentId}`, {content});
  return response.data;
}

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`/comment/delete/${commentId}`);
  return response.data;
}

const commentService = {
  saveComments,
  updateComment,
  deleteComment,
}

export default commentService;