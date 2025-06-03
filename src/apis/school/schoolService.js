import {axiosInstance} from "@apis/axiosInstance.js";

export const getSchoolEvents = async ({cursor, count}) => {
  const response = await axiosInstance.get('/schoolEvent/getEvents', { // 여기엔 유저정보 없음
    params: {cursor, count}
  })
  return response.data;
}

const schoolService = {
  getSchoolEvents,
}

export default schoolService;