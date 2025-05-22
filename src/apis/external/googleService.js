import axios from 'axios';

export const getGooglePlaceInfo = async (query) => {
  const response = await axios.get(
    `/place/textsearch/json`,
    {
      params: {
        query: query,
        key: import.meta.env.VITE_APP_GOOGLE_API_KEY,
        language: 'ko',
      }
    }
  );
  return response.data;
}

export const getGooglePlaceImage = async (place_id) => {
  const response = await axios.get(
    '/place/details/json',
    {
      params: {
        place_id,
        key: import.meta.env.VITE_APP_GOOGLE_API_KEY,
        language: 'ko',
      }
    }
  )
  return response.data;
}

const googleService = {
  getGooglePlaceInfo,
  getGooglePlaceImage,
}

export default googleService;