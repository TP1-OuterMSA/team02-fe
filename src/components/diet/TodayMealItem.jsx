import {icPlus, icMinus, icClose} from "@assets/index.js";
import OvalLineButton from "@components/diet/OvalLineButton.jsx";

const TodayMealItem = ({item}) => {
  return (
      <div className="bg-white rounded-[10px] border border-neutral-200 p-5 flex justify-between w-160">
        <div className="flex gap-5">
          <p className="text-black text-lg font-semibold">{item?.foodName}</p>
          <div className="flex gap-3">
            <OvalLineButton src={icMinus} size={3}/>
            <input
                type="number"
                value={item?.foodWeight}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-15 text-center text-black text-xl font-bold appearance-none"/>
            <OvalLineButton src={icPlus} size={3}/>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-black text-base font-semibold">{Math.round(item?.kcal)}kcal</p>
          <img src={icClose} className="w-5 h-5 cursor-pointer"/>
        </div>
      </div>
  );
};

export default TodayMealItem;