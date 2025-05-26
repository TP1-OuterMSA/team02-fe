import {useState} from "react";
import {icLocate, icArrowUpBlack, icArrowDownBlack, imgProfile} from "@assets/index.js";
import SmallButton from "@components/common/SmallButton.jsx";

const MatchListCard = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="pb-2">
      <div className="p-3 border-b border-stone-50">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img src={icLocate} className="w-6 h-6"/>
            <p className="text-black text-xl font-bold">손가네 빈대떡</p>
          </div>
          <img src={icArrowUpBlack} className="w-6 h-6 cursor-pointer"/>
        </div>
        <p className="pl-7 pt-0.5 text-black text-base font-normal">25년 5월 16일 12시 05분</p>
      </div>
      {showDetail && <div className="bg-stone-50 p-4">
        <div className="flex gap-3">
          <img src={imgProfile} className="w-8 h-8 rounded-full"/>
          <div>
            <p className="text-black text-base font-bold">익명1</p>
            <p className="text-black text-sm font-normal ">"같이 밥먹으로 가시죠"</p>
          </div>
        </div>
        <div className="flex gap-2 items-center pl-9 pt-2">
          <SmallButton text={"수락"} style={"w-27 text-center"}/>
          <SmallButton text={"거절"} style={"w-27 text-center bg-neutral-700"}/>
        </div>
      </div>}

    </div>
  );
};

export default MatchListCard;