import {icRight, icLeft, imgMainCharcter} from "@assets/index.js";
import LineButton from "@components/common/LineButton.jsx";
import {string} from "@utils/string.js";
import Graph from "@components/diet/Graph.jsx";
import CalendarItem from "@components/diet/CalendarItem.jsx";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale("ko");

import {useState} from "react";

const Diet = () => {

  const today = dayjs();
  const [startOfWeek, setStartOfWeek] = useState(today.startOf("week").add(1, "day"));

  const generateWeek = () => {
    return Array.from({ length: 7 }).map((_, idx) => startOfWeek.add(idx, "day"));
  };

  const handlePrevWeek = () => {
    setStartOfWeek(startOfWeek.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setStartOfWeek(startOfWeek.add(7, "day"));
  };

  const handleToday = () => {
    setStartOfWeek(today.startOf("week").add(1, "day"));
  };

  const week = generateWeek();
  console.log(week);
  return (
    <div className="pl-7 pr-7 flex gap-5">
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-black text-2xl font-extrabold">
            {startOfWeek.format("YYYY.MM.DD")} ~ {startOfWeek.add(6, "day").format("MM.DD")}
          </p>
          <div className="flex gap-2">
            <LineButton onClick={handlePrevWeek}><img src={icLeft} alt="icon" className="w-6 h-6"/></LineButton>
            <LineButton onClick={handleNextWeek}><img src={icRight} alt="icon" className="w-6 h-6"/></LineButton>
            <LineButton onClick={handleToday}><span className="text-black text-xl font-bold ml-1 mr-1">오늘</span></LineButton>
          </div>
        </div>
        <div className="flex justify-between pl-2 pr-2 mt-5">
          {week.map((date, idx) => {
            const isToday = date.isSame(today, "day");
            return <CalendarItem key={idx} idx={idx} date={date.format("DD")} isToday={isToday} />
          })}
        </div>
      </div>
      <div className="w-100">
        <div className="w-100 h-96 bg-white rounded-2xl border border-neutral-200 flex flex-col items-center">
          <p className="text-zinc-500 text-base font-bold mt-10">{string.CALORIE}</p>
          <p className="text-black text-2xl font-extrabold"><span className="text-blue-800 text-3xl font-extrabold">1999</span>/2000{string.M_CALORIE}</p>
          <img src={imgMainCharcter} className="w-28 h-28 mt-10"/>
          <div className="mt-5 flex gap-5 w-full justify-center">
            <Graph title={string.CARBOHYDRATE} percentage={20}/>
            <Graph title={string.PROTEIN} percentage={20}/>
            <Graph title={string.PROVINCE} percentage={20}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diet;