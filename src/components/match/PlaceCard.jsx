import {icForkSpoon} from "@assets/index.js";
import SmallButton from "@components/common/SmallButton.jsx";

const PlaceCard = ({ place_name, address_name, total = 0, onClick}) => {
  return (
    <div className="min-w-96 h-35 bg-white rounded-2xl shadow-[1px_3px_9px_0px_rgba(0,0,0,0.08)] p-5 whitespace-nowrap">
      <p className="text-black text-xl font-extrabold">{place_name}</p>
      <p className="text-black text-base font-normal mt-1">{address_name}</p>
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-2">
          <img src={icForkSpoon} className="w-4 h-4"/>
          <p>{total}명</p>
        </div>
        <SmallButton text={"자세히 보기"} onClick={onClick} />
      </div>
    </div>
  );
};

export default PlaceCard;