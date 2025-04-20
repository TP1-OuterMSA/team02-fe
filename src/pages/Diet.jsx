import {useState, useEffect} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale("ko");
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);
import {DayPicker, getDefaultClassNames} from "react-day-picker";
import "react-day-picker/style.css";
import {toast} from "react-toastify";

import Graph from "@components/diet/Graph.jsx";
import LineButton from "@components/common/LineButton.jsx";
import CalendarItem from "@components/diet/CalendarItem.jsx";
import DietContainer from "@components/diet/DietContainer.jsx";
import RecommendCalorie from "@components/modal/RecommendCalorie.jsx";
import AddDiet from "@components/modal/AddDiet.jsx";

import {icRight, icLeft, imgMainCharcter, icMorning, icLunch, icDinner, icSnack} from "@assets/index.js";
import {constant} from "@utils/constant.js";
import {string} from "@utils/string.js";

import userService from "@apis/user/userService.js";
import dietService from "@apis/diet/dietService.js";

// Global 변수
const today = dayjs();

const Diet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddDietOpen, setIsAddDietOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today);
  const [startOfWeek, setStartOfWeek] = useState(today.startOf("isoWeek"));
  const [markedDays, setMarkedDays] = useState([]);
  const [breakFast, setBreakFast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snack, setSnack] = useState([]);
  const [bodyInfo, setBodyInfo] = useState({gender: "", age:"", cm:"", kg:""});
  const [consumeCalories, setConsumeCalories] = useState(0);
  const [calories, setCalories] = useState(0);
  const [modalTime, setModalTime] = useState();
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));

  const week = Array.from({ length: 7 }).map((_, idx) => startOfWeek.add(idx, "day"));
  const defaultClassNames = getDefaultClassNames();


  useEffect(() => {
    patchUserData();
  }, []);


  // 오른쪽 하단 달력 전체에 연결되는 api
  useEffect(() => {
    patchDiaryData();
  }, [currentMonth]);


  useEffect(() => {
    patchGetDiets();
  }, [selectedDay]);

  const patchUserData = async () => {
    const userData = await userService.getRecommendKcal();
    if(userData === null) setIsModalOpen(true);
    setCalories(userData);
  }

  const patchDiaryData = async () => {
    const datas = await dietService.getDietDate(currentMonth);
    datas?.forEach((data) => setMarkedDays((prev) => [...prev, dayjs(data).toDate()] ))
  }

  const patchGetDiets = async () => {
    setBreakFast([]);
    setLunch([]);
    setDinner([]);
    setSnack([]);

    const datas = await dietService.getDiets(selectedDay.format("YYYY-MM-DD"));
    console.log(datas);
    datas?.forEach((data) => {
      switch(data.type){
        case constant.BREAKFAST:
          setBreakFast(data.foods);
          break;
        case constant.LUNCH:
          setLunch(data.foods);
          break;
        case constant.DINNER:
          setDinner(data.foods);
          break;
        case constant.SNACK:
          setSnack(data.foods);
          break;
      }
    });
  }

  const handlePrevWeek = () => {
    setStartOfWeek(startOfWeek.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setStartOfWeek(startOfWeek.add(7, "day"));
  };

  const handleToday = () => {
    setStartOfWeek(today.startOf("isoWeek"));
    setSelectedDay(today);
  };

  const handleBodyInfo = (data, type) => {
    setBodyInfo((prev) => ({
      ...prev,
      [type]: data
    }));
  }

  const handleComplete = async () => {
    console.log(bodyInfo)
    if(bodyInfo.gender === '' || bodyInfo.kg === "" || bodyInfo.cm === "" || bodyInfo.age === "") {
      toast.warn("아래 항목을 모두 입력해주세요.")
      return;
    }
    setCalories(bodyInfo.gender === constant.MALE ? Math.round(66.47 + (13.75 * bodyInfo.kg) + (5 * bodyInfo.cm) - (6.76 * bodyInfo.age)) :
      Math.round(655.1 + (9.56 * bodyInfo.kg) + (1.85 * bodyInfo.cm) - (4.68 * bodyInfo.age))
    )
    await userService.updateRecommendKcal(calories);
    setIsModalOpen(false)
  }

  const handleModalOpen = (type) => {
    setModalTime(type);
    setIsAddDietOpen(true);
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
            return <CalendarItem key={idx} idx={idx} date={date.format("DD")} isSelect={isSelect} onClick={() => setSelectedDay(date)} />
          })}
        </div>
        <div className="bg-indigo-50 rounded-2xl h-[72vh] mt-3 p-5 flex flex-col gap-6 overflow-y-auto" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <DietContainer img={icMorning} title={string.MORNING} onClickAdd={() => handleModalOpen(constant.BREAKFAST)} data={breakFast}/>
          <DietContainer img={icLunch} title={string.LUNCH} onClickAdd={() => handleModalOpen(constant.LUNCH)} data={lunch}/>
          <DietContainer img={icDinner} title={string.DINNER} onClickAdd={() => handleModalOpen(constant.DINNER)} data={dinner}/>
          <DietContainer img={icSnack} title={string.SNACK} onClickAdd={() => handleModalOpen(constant.SNACK)} data={snack}/>
        </div>
      </div>
      <div className="w-100">
        <div className="w-100 h-96 bg-white rounded-2xl border border-neutral-200 flex flex-col items-center">
          <p className="text-zinc-500 text-base font-bold mt-10">{string.CALORIE}</p>
          <p className="text-black text-2xl font-extrabold"><span className="text-blue-800 text-3xl font-extrabold">{consumeCalories}</span>/{calories}{string.M_CALORIE}</p>
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
                setCurrentMonth(dayjs(month).format("YYYY-MM"))
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
          <RecommendCalorie bodyInfo={bodyInfo} setBodyInfo={handleBodyInfo} onClick={handleComplete}/>
      }
      {isAddDietOpen &&
        <AddDiet
          type={modalTime}
          onClose={()=> setIsAddDietOpen(false)}
        />
      }
    </div>
  );
};

export default Diet;