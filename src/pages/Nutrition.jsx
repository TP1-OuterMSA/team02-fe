import {useEffect, useState} from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import 'swiper/css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/locale/ko";
import {constant} from "@utils/constant.js";
import {string} from "@utils/string.js";
import {icCalendar, icBar, icBarWhite, icLinear, icLinearWhite,icLeft, icRight, imgAdvice, imgRecommend} from "@assets/index.js";
import nutritionService from "@apis/nutrition/nutritionService.js";


import NutritionChart from "@components/nutrition/NutritionChart.jsx";
import RecommendFood from "@components/nutrition/RecommendFood.jsx";
import LoadingSpinner from "@components/common/LoadingSpinner.jsx";

const Nutrition = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState(constant.DAY);
  const [activeGraph, setActiveGraph] = useState(constant.STICK);
  const [showTextBalloon, setShowTextBalloon] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [labels, setLabels] = useState([]);
  const [carbData, setCarbData] = useState([]);
  const [proteinData, setProteinData] = useState([]);
  const [fatData, setFatData] = useState([]);
  const [recommendFood, setRecommendFood] = useState([]);
  const [evaluation, setEvaluation] = useState("한줄평을 가져올 수 없습니다. 다시 시도해주세요");

  useEffect(() => {
    patchAnalyzeDate();
  }, [selectedDate]);

  useEffect(() => {
    if (!showTextBalloon) return;

    let index = 0;

    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => {
        // 방어 코드: index가 범위를 넘지 않도록
        if (index >= evaluation.length) {
          clearInterval(typingInterval);
          // 전체 출력 후 3초 뒤에 말풍선 숨김
          setTimeout(() => setShowTextBalloon(false), 2500);
          return prev;
        }
        const next = prev + evaluation[index];
        index++;
        return next;
      });
    }, 100);

    return () => clearInterval(typingInterval);
  }, [showTextBalloon]);

  const patchAnalyzeDate = async () => {
    setLabels([]);
    setCarbData([]);
    setProteinData([]);
    setFatData([]);

    const datas = await nutritionService.getWeekNutrition({date: dayjs(selectedDate).format("YYYY-MM-DD")});
    datas.nutritions.map((nutrition) => {
      setLabels((prev) => [...prev, "~" + dayjs(nutrition.endDate).format("MM.DD")]);
      setCarbData((prev) => [...prev, Math.round(nutrition.carb)]);
      setProteinData((prev) => [...prev, Math.round(nutrition.protein)]);
      setFatData((prev) => [...prev, Math.round(nutrition.fat)]);
    })
    setRecommendFood(datas.recommendFoods);
    console.log("분석결과", datas);
  }


  const handleAdviceClick = () => {
    setDisplayedText("");
    setShowTextBalloon(true);
  }


  const handleTabClick = (tab) => {
    if (tab === constant.DAY) {
      setActiveTab(tab)
    } else {
      setActiveTab(tab)
    }
  }

  const handleChangeGraph = (type) => {
    setActiveGraph(type);
  }
  return (
    <div className="w-full p-5">
      <div className="bg-neutral-50 rounded-xl border border-gray-200 inline-block p-3 pr-8 cursor-pointer">
        <div className="flex items-center gap-3">
          <img src={icCalendar} className="w-6 h-6"/>
          <DatePicker
            dateFormat={"yyyy-MM-dd"}
            locale={ko}
            className="text-black text-xl font-extrabold w-29 text-center focus:outline-none focus:ring-0"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[10px_10px_80px_-15px_rgba(231,228,232,0.60)] mt-4 pb-5">
        <div className="pl-7 pr-5 pt-5 flex justify-between mb-3">
          <div className="flex gap-3">
            <p
              className={clsx("cursor-pointer text-xl font-bold", `${activeTab === constant.DAY ? "text-blue-800" : "text-neutral-500"}`)}
              onClick={() => handleTabClick(constant.DAY)}>주간</p>
            <p
              className={clsx("cursor-pointer text-xl font-bold", `${activeTab === constant.WEEK ? "text-blue-800" : "text-neutral-500"}`)}
              onClick={() => handleTabClick(constant.WEEK)}>일일</p>
          </div>
          <div className="flex bg-white rounded-md border border-neutral-200 border-1">
            <div
              className={clsx("p-1 m-1 cursor-pointer rounded-xs ", `${activeGraph === constant.STICK ? "bg-(--primary)" : "bg-white"}`)}>
              <img src={activeGraph === constant.STICK ? icBarWhite : icBar} className="w-6 h-6 cursor-pointer"
                   onClick={() => handleChangeGraph(constant.STICK)}/>
            </div>
            <div
              className={clsx("p-1 m-1 cursor-pointer rounded-xs ", `${activeGraph === constant.LINEAR ? "bg-(--primary)" : "bg-white"}`)}>
              <img src={activeGraph === constant.LINEAR ? icLinearWhite : icLinear} className="w-6 h-6 cursor-pointer"
                   onClick={() => handleChangeGraph(constant.LINEAR)}/>
            </div>
          </div>
        </div>
        <NutritionChart
          labels={labels}
          carbData={carbData}
          proteinData={proteinData}
          fatData={fatData}
        />
      </div>
      <div className="flex mt-4 gap-4">
        <div className="bg-white rounded-2xl shadow-[10px_10px_80px_-15px_rgba(231,228,232,0.60)] w-[50%] p-6">
          <div className="flex justify-between">
            <p className="text-black text-xl font-bold">{string.RECOMMENDMENU}</p>
            <div className="flex gap-4">
              <img src={icLeft} className="w-5 h-5 cursor-pointer custom-swiper-prev"/>
              <img src={icRight} className="w-5 h-5 cursor-pointer custom-swiper-next"/>
            </div>
          </div>
          <div className="flex p-2 mt-2 overflow-x-auto gap-4 w-full" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                modules={[Navigation]}
                navigation={{
                  prevEl: '.custom-swiper-prev',
                  nextEl: '.custom-swiper-next',
                }}
            >
              {recommendFood?.map((food, index) => (
                  <SwiperSlide>
                    <RecommendFood
                        key={index}
                        {...food}
                    />
                  </SwiperSlide>
              ))}
            </Swiper>

            {!!recommendFood && (
                <div className="w-full flex flex-col items-center">
                  <LoadingSpinner img={imgRecommend} size={200}/>
                  <p className="text-black mt-3 text-xl">추천 메뉴 불러오는 중...</p>
                  <p></p>
                </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-[10px_10px_80px_-15px_rgba(231,228,232,0.60)] w-[50%] p-6">
          <p className="text-black text-xl font-bold">{string.ANALYZEKACL}</p>
          <div className="flex flex-col gap-4 h-full w-full justify-center">
            <div className="flex gap-2 items-end">
              <p className="text-black text-3xl font-extrabold">2198</p>
              <p className="text-black text-xl font-bold">Total Kcal</p>
            </div>
            <div className="w-full h-6 bg-zinc-300 rounded-[10px]">
              <div className="w-20 h-full bg-(--primary) rounded-[10px]"/>
            </div>
            <p className=" text-black text-xl font-normal ">평균적으로 2183 Kcal를 섭취하셨어요</p>
          </div>
        </div>
      </div>
      <div
        onClick={handleAdviceClick}
        className="w-16 h-16 bg-white rounded-full fixed bottom-5 right-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.30)] shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)]">
        <img src={imgAdvice} className="w-16 h-16 cursor-pointer"/>
      </div>
      {showTextBalloon && <div className="bg-blue-800 rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3 inline-flex fixed bottom-13 right-25">
        <p className="text-white">{displayedText}</p>
      </div>}

    </div>
  );
};

export default Nutrition;