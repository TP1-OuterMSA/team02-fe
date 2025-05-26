import {EventSourcePolyfill} from "event-source-polyfill";

export const connectSSE = ({userId}) => {
  const eventSource = new EventSourcePolyfill(`${import.meta.env.VITE_APP_BASE_URL}/notification/subscribe/${userId}`, {
    headers: {
      "Last-Event-ID": "1",
    }
  });

  eventSource.onopen = () => {
    console.log("SSE connected");
  }

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
}

const notificationService = {
  connectSSE,
}

export default notificationService;