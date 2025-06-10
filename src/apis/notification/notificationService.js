import {EventSourcePolyfill} from "event-source-polyfill";
import {axiosInstance} from "@apis/axiosInstance.js";

const GT_PREFIX = import.meta.env.VITE_ABSOLUTE_URL + "/api/team06-api-gateway/api/team2";

let eventSource = null;
export const connectSSE = () => {
  let token = localStorage.getItem("accessToken");
  // 리프레시 전용 인스턴스 (인증 서비스 경로)

  const connect = () => {
    eventSource = new EventSourcePolyfill(`${GT_PREFIX}/notification/subscribe`, {
      headers: {
        "Last-Event-ID": "",
        "Authorization": `Bearer ${token}`,
      },
      heartBeatTimeout: 10000,
    });

    eventSource.onerror = async (err) => {
      const status = err?.status || err?.target?.status;

      if (status === 401) {
        // 토큰 만료 → 리프레시 시도
        try {
          const { data } = await axiosInstance.post("/api/auth/user/refresh");
          const newToken = data.accessToken;
          localStorage.setItem("accessToken", newToken);
          token = newToken;

          // 기존 SSE 종료 후 재연결
          eventSource.close();
          connect(); // 재귀적으로 다시 연결
        } catch (error) {
          console.log(error)
        }
      }
    };
  }
  connect();
  return eventSource;
}

export const getPastSSE = async ({lastEventId, userId}) => {
  console.log("lastEventId: ", lastEventId, userId)
  const reponse = await axiosInstance.get(`${GT_PREFIX}/notification/past`, {
    headers: {
      "Last-Event-ID": lastEventId,
      "Authorization": userId,
    },
  });
  return reponse.data;
}

const notificationService = {
  connectSSE,
}

export default notificationService;