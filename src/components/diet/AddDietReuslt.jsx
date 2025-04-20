import {icCloseWhite} from "@assets/index.js";

const AddDietReuslt = ({foodName, foodWeight, kcal, onClick}) => {
  return (
    <div className="flex justify-between w-full p-3 border border-1 border-blue-800/50 bg-blue-800/5 rounded-3xl mb-2">
      <div className="flex items-center gap-3">
        <p className="text-black text-base">{foodName}</p>
        <p className="text-neutral-400 text-sm">{foodWeight}g</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-black text-base font-bold">{kcal}kcal</p>
        <button className="cursor-pointer w-6 h-6 bg-blue-800 rounded-full inline-flex justify-center items-center" onClick={onClick}><img src={icCloseWhite} className="w-3 h-3"/></button>
      </div>
    </div>
  );
};

export default AddDietReuslt;