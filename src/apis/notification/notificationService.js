import {EventSourcePolyfill} from "event-source-polyfill";
import {axiosInstance} from "@apis/axiosInstance.js";

export const connectSSE = ({userId}) => {
  const eventSource = new EventSourcePolyfill(`${import.meta.env.VITE_APP_BASE_URL}/notification/subscribe`, {
    headers: {
      "Last-Event-ID": "",
      "user-id": userId,
    },
  });

  eventSource.onopen = () => {
    console.log("SSE connected");
  }

  eventSource.addEventListener("sse", (event) => {
    try {
      console.log(event)
      // getPastSSE({lastEventId: event.id, userId})
      console.log("SSE 이벤트(JSON):", event);
    } catch {
      console.log("SSE 이벤트(일반 문자열):", event.data);
    }
  });

  eventSource.onmessage = (event) => {
    try{
      const data = JSON.parse(event.data);
      console.log("SSE 데이터: ", data);
    } catch (error){
      console.error("SSE 데이터 파싱 실패:", error);
    }
  }

  eventSource.onerror = (e) => {
    eventSource.close();

    if(e.error){
      // 에러 발생시 할일
      console.log("SSE 에러 발생:", e)
    }

    if (e.target.readyState === EventSource.CLOSED) {
      // 종료 시 할 일
      console.log("SSE 종료")
    }
  }
  return eventSource;
}

export const getPastSSE = async ({lastEventId, userId}) => {
  console.log("lastEventId: ", lastEventId, userId)
  const reponse = await axiosInstance.get("/notification/past", {
    headers: {
      "Last-Event-ID": lastEventId,
      "user-id": userId,
    },
  });
  return reponse.data;
}

const notificationService = {
  connectSSE,
}

export default notificationService;