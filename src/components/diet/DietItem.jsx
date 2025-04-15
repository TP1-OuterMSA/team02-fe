import React from 'react';
import {icCloseWhite} from "@assets/index.js";

const DietItem = () => {
  return (
    <div className="flex justify-between items-center pt-3 pl-1.5 pr-1.5">
      <div className="flex justify-between items-center gap-1">
        <p className="text-black text-lg font-bold">햇반</p>
        <p className="text-zinc-700 text-l font-bold">100g</p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-black text-xl font-semibold">1400kcal</p>
        <img src={icCloseWhite} alt="icon" className="w-6 h-6 cursor-pointer"/>
      </div>
    </div>
  );
};

export default DietItem;