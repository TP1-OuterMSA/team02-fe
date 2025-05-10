import React from 'react';
import {icCloseGray} from "@assets/index.js";

const DietItem = ({food, gram, kcal, onClickDelete}) => {
  return (
    <div className="flex justify-between items-center pt-3 pl-1.5 pr-1.5">
      <div className="flex justify-between items-center gap-1">
        <p className="text-black text-lg font-bold">{food}</p>
        <p className="text-zinc-700 text-l font-bold">{Math.round(gram)}g</p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-black text-xl font-semibold">{Math.round(kcal)}kcal</p>
        <img src={icCloseGray} alt="icon" className="w-6 h-6 cursor-pointer" onClick={onClickDelete}/>
      </div>
    </div>
  );
};

export default DietItem;