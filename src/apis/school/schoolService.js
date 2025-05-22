import {axiosInstance} from "@apis/axiosInstance.js";

export const getSchoolEvents = async ({cursor, count}) => {
  const response = await axiosInstance.get('/schoolEvent/getEvents', {
    params: {cursor, count}
  })
  return response.data;
}

const schoolService = {
  getSchoolEvents,
}

export default schoolService;