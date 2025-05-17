import {icForkSpoon} from "@assets/index.js";
import SmallButton from "@components/common/SmallButton.jsx";

const PlaceCard = () => {
  return (
    <div className="min-w-96 h-35 bg-white rounded-2xl shadow-[1px_3px_9px_0px_rgba(0,0,0,0.08)] p-5 whitespace-nowrap">
      <p className="text-black text-xl font-extrabold">손가네 빈대떡</p>
      <p className="text-black text-base font-normal mt-1">서울 서대문구 거북골로 33-10 1층</p>
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-2">
          <img src={icForkSpoon} className="w-4 h-4"/>
          <p>3명</p>
        </div>
        <SmallButton text={"자세히 보기"}/>
      </div>
    </div>
  );
};

export default PlaceCard;