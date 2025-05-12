import {imgFood} from "@assets/index.js";

const RecommendFood = ({foodName, foodWeight, kcal}) => {
  return (
    <div className="w-60 flex flex-col items-center bg-blue-800/20 rounded-[10px] border border-blue-800 p-5">
      <img src={imgFood} className="w-12 h-12"/>
      <p className="text-black text-xl font-bold mt-2">{foodName}</p>
      <p className="text-black text-l font-normal ">{foodWeight}g</p>
      <p className="text-black text-xl font-bold mt-4">{kcal}Kcal</p>
    </div>
  );
};

export default RecommendFood;