import {useState} from "react";
import {constant} from "@utils/constant.js";
import {string} from "@utils/string.js";
import {icCalendar, icBar, icBarWhite, icLinear, icLinearWhite, imgAdvice} from "@assets/index.js";
import clsx from "clsx";

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState(constant.DAY);
  const [activeGraph, setActiveGraph] = useState(constant.STICK);

  const handleTabClick = (tab) => {
    if(tab === constant.DAY){
      setActiveTab(tab)
    } else{
      setActiveTab(tab)
    }
  }

  const handleChangeGraph = (type) => {
    setActiveGraph(type);
  }
  return (
      <div className="w-full p-5">
        <div className="bg-neutral-50 rounded-xl border border-gray-200 inline-block p-3 pr-8">
          <div className="flex items-center gap-3">
            <img src={icCalendar} className="w-6 h-6"/>
            <p className="text-black text-xl font-extrabold">2025-05-25 - 06.24</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-[10px_10px_80px_-15px_rgba(231,228,232,0.60)] h-24 mt-4">
          <div className="pl-7 pr-5 pt-5 flex justify-between">
            <div className="flex gap-3">
              <p className={clsx("cursor-pointer text-xl font-bold", `${activeTab === constant.DAY ? "text-blue-800" : "text-neutral-500"}`)}
                 onClick={() => handleTabClick(constant.DAY)}>주간</p>
              <p className={clsx("cursor-pointer text-xl font-bold", `${activeTab === constant.WEEK ? "text-blue-800" : "text-neutral-500"}`)}
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
        </div>
        <div className="flex mt-4 gap-4">
          <div className="bg-white rounded-2xl shadow-[10px_10px_80px_-15px_rgba(231,228,232,0.60)] w-[50%] h-24 p-4">
            <p className="text-black text-xl font-bold">{string.RECOMMENDMENU}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-[10px_10px_80px_-15px_rgba(231,228,232,0.60)] w-[50%] h-24 p-4">
            <p className="text-black text-xl font-bold">{string.ANALYZEKACL}</p>
          </div>
        </div>
        <div className="w-16 h-16 bg-white rounded-full fixed bottom-5 right-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.30)] shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)]">
          <img src={imgAdvice} className="w-16 h-16 cursor-pointer"/>

        </div>

      </div>
  );
};

export default Nutrition;