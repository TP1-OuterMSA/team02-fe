import {axiosInstance} from "@apis/axiosInstance.js";

const GT_PREFIX = import.meta.env.VITE_ABSOLUTE_URL + "/api/team06-api-gateway";

export const getPosts = async (cursor = 0 , count = 4, filter) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/community/getPosts`, {
    params: {cursor, count, filter}
  });
  return response.data;
}

export const getPostById = async (id) => {
  const response = await axiosInstance.get(`${GT_PREFIX}/community/getPost/${id}`);
  return response.data;
}

export const savePosts = async ({title, content, image}) => {
  const formData = new FormData();

  const requestData = JSON.stringify({ title, content });
  const requestBlob = new Blob([requestData], { type: "application/json" });
  formData.append("request", requestBlob);
  formData.append("image", image);

  const response = await axiosInstance.post(`${GT_PREFIX}/community/save`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const updatePosts = async ({postId, title, content, image}) => {
  const formData = new FormData();

  const requestData = JSON.stringify({ title, content });
  const requestBlob = new Blob([requestData], { type: "application/json" });
  formData.append("request", requestBlob);
  formData.append("image", image);

  const response = await axiosInstance.patch(`${GT_PREFIX}/community/update/${postId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const likePost = async (postId) => {
  const response = await axiosInstance.post(`${GT_PREFIX}/community/like/${postId}`);
  return response.data;
}
export const unLikePost = async (postId) => {
  const response = await axiosInstance.post(`${GT_PREFIX}/community/unlike/${postId}`);
  return response.data;
}
export const blockPost = async (postId) => {
  const response = await axiosInstance.patch(`${GT_PREFIX}/community/block/${postId}`);
  return response.data;
}
export const unBlockPost = async (postId) => {
  const response = await axiosInstance.patch(`${GT_PREFIX}/community/unblock/${postId}`);
  return response.data;
}
export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`${GT_PREFIX}/community/delete/${postId}`);
  return response.data;
}


const communityService = {
  getPosts,
  getPostById,
  savePosts,
  updatePosts,
  likePost,
  unLikePost,
  blockPost,
  unBlockPost,
  deletePost,
}

export default communityService;