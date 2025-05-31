import {useEffect, useRef} from "react";
import {icNotify, imgMainProfile, icMain} from "@assets/index.js";
import {useCustomNavigation} from "@hooks/useCustomNavigation.js";
import {useCustomWindowNavigation} from "@hooks/useCustomWindowNavigation.js";
import {pagePath} from "@/routes/pagePath.js";
import notificationService from "@apis/notification/notificationService.js";
import {toast} from "react-toastify";


const Header = () => {
  const {navigateTo} = useCustomNavigation();
  const {navigateToWindow} = useCustomWindowNavigation();
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const setupSSE = async () => {
    if(eventSourceRef.current){
      eventSourceRef.current.close(); // 기존연결 종료
    }

    const eventSource = await notificationService.connectSSE();
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE connected");
    }

    eventSource.addEventListener("sse", (event) => {
      try {
        const parsedData = JSON.parse(event?.data);
        console.log("SSE 이벤트(JSON):", parsedData);
        toast.info(parsedData?.message, {
          autoClose: false,    // 자동으로 닫히지 않음
          closeOnClick: false, // 클릭해도 닫히지 않음
          closeButton: true,   // X 버튼은 표시
          draggable: false,
        });
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

    eventSource.onerror = async () => {
      eventSource.close();
      console.log("SSE 종료")
      reconnectTimeoutRef.current = setTimeout(() => {
        setupSSE();
      }, 4500)
    }
  }

  useEffect(() => {
    setupSSE();

    return () => {
      eventSourceRef.current?.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  return (
      <div className="w-full h-22 justify-between flex pl-7 pr-7 sticky top-0 bg-white">
        <img src={icMain} className="w-40 cursor-pointer min-md:w-0" onClick={() => navigateTo(pagePath.ROOT)}/>
        <div className="flex items-center gap-5">
          <img src={icNotify} className="w-7 h-7 cursor-pointer"/>
          <img src={imgMainProfile} className="w-11 h-11 cursor-pointer" onClick={() => navigateToWindow(pagePath.MYPAGE)}/>
        </div>
      </div>
  );
};

export default Header;