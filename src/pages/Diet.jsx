import {icRight, icLeft, imgMainCharcter, icMorning, icLunch, icDinner, icSnack} from "@assets/index.js";
import LineButton from "@components/common/LineButton.jsx";
import {string} from "@utils/string.js";
import Graph from "@components/diet/Graph.jsx";
import CalendarItem from "@components/diet/CalendarItem.jsx";
import DietContainer from "@components/diet/DietContainer.jsx";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale("ko");
import {DayPicker, getDefaultClassNames} from "react-day-picker";
import "react-day-picker/style.css";
import {useState} from "react";
import RecommendCalorie from "@components/modal/RecommendCalorie.jsx";

const Diet = () => {
  const today = dayjs();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState(today);
  const [startOfWeek, setStartOfWeek] = useState(today.startOf("week").add(1, "day"));
  const [markedDays, setMarkedDays] = useState([new Date(2025, 3, 8), new Date(2025, 3, 10)]);

  const week = Array.from({ length: 7 }).map((_, idx) => startOfWeek.add(idx, "day"));
  const defaultClassNames = getDefaultClassNames();

  const handlePrevWeek = () => {
    setStartOfWeek(startOfWeek.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setStartOfWeek(startOfWeek.add(7, "day"));
  };

  const handleToday = () => {
    setStartOfWeek(today.startOf("week").add(1, "day"));
    setSelectedDay(today);
  };

  const handleSelectedDay = (date) => {
    setSelectedDay(date);
  }

  const handleChangeMonth = (month) => {
    console.log(dayjs(month).format("YYYY-MM"));
    // 해당 년,월에 데이터 받아오는 api 추가해야 함
  }

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
            const isSelect = date.isSame(selectedDay, "day");
            return <CalendarItem key={idx} idx={idx} date={date.format("DD")} isSelect={isSelect} onClick={() => handleSelectedDay(date)} />
          })}
        </div>
        <div className="bg-indigo-50 rounded-2xl h-[72vh] mt-3 p-5 flex flex-col gap-6 overflow-y-auto" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <DietContainer img={icMorning} title={string.MORNING}/>
          <DietContainer img={icLunch} title={string.LUNCH}/>
          <DietContainer img={icDinner} title={string.DINNER}/>
          <DietContainer img={icSnack} title={string.SNACK}/>
        </div>
      </div>
      <div className="w-100">
        <div className="w-100 h-96 bg-white rounded-2xl border border-neutral-200 flex flex-col items-center">
          <p className="text-zinc-500 text-base font-bold mt-10">{string.CALORIE}</p>
          <p className="text-black text-2xl font-extrabold"><span className="text-blue-800 text-3xl font-extrabold">1999</span>/2000{string.M_CALORIE}</p>
          <img src={imgMainCharcter} className="w-28 h-28 mt-10"/>
          <div className="mt-5 flex gap-5 w-full justify-center">
            <Graph title={string.CARBOHYDRATE} percentage={20} color={"bg-(--primary)"}/>
            <Graph title={string.PROTEIN} percentage={20} color={"bg-green-600"}/>
            <Graph title={string.PROVINCE} percentage={20} color={"bg-lime-400"}/>
          </div>
        </div>
        <div className="w-100 mt-5">
          <DayPicker
              animate
              defaultMonth={new Date()}
              modifiers={{
                booked: markedDays,
              }}
              modifiersClassNames={{
                booked: 'marked-day',
              }}
              onMonthChange={(month) => {
                handleChangeMonth(month)
              }}
              classNames={{
                today: `text-(--primary) font-extrabold`,
                day: 'p-4',
                root: `${defaultClassNames.root} flex justify-center`,
              }}
          />
        </div>
      </div>
      {isModalOpen &&
          <RecommendCalorie/>
      }
    </div>
  );
};

export default Diet;