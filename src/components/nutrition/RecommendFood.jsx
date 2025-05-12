import {imgFood} from "@assets/index.js";

const RecommendFood = ({foodName = "tdddddeeeest", foodWeight = 200, kcal = 200}) => {
  return (
    <div className="min-w-48 flex flex-col items-center bg-blue-800/20 rounded-[10px] border border-blue-800 p-6">
      <img src={imgFood} className="w-12 h-12"/>
      <p className="text-black text-xl font-bold mt-2 truncate w-40 text-center">{foodName}</p>
      <p className="text-black text-l font-normal ">{foodWeight}g</p>
      <p className="text-black text-xl font-bold mt-4">{kcal}Kcal</p>
    </div>
  );
};

export default RecommendFood;