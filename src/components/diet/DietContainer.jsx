import React from 'react';
import {icPlusWhite} from "@assets/index.js";
import DietItem from "@components/diet/DietItem.jsx";

const DietContainer = ({img, title}) => {
  return (
    <div className="px-7 py-5 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <img src={img} className="w-7 h-7"/>
          <p className="text-black text-xl font-bold">{title}</p>
        </div>
        <div className="w-7 h-7 bg-blue-600 rounded-full flex justify-center items-center cursor-pointer">
          <img src={icPlusWhite} className="w-4 h-4"/>
        </div>
      </div>
      <div className="mt-3">
        <DietItem/>
      </div>
    </div>
  );
};

export default DietContainer;