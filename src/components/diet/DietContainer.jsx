import React from 'react';
import {icPlusWhite} from "@assets/index.js";
import DietItem from "@components/diet/DietItem.jsx";

const DietContainer = ({img, title, onClickAdd, data}) => {
  return (
    <div className="px-7 py-5 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <img src={img} className="w-7 h-7"/>
          <p className="text-black text-xl font-bold">{title}</p>
        </div>
        <div className="w-7 h-7 bg-blue-600 rounded-full flex justify-center items-center cursor-pointer" onClick={onClickAdd}>
          <img src={icPlusWhite} className="w-4 h-4"/>
        </div>
      </div>
      <div className="mt-3">
        {data.length === 0 && <p className="text-center text-lg pt-3 pb-3">먹은 음식 혹은 먹고 싶은 음식들을 추가해보세요</p>}
        {data.map((item, index) => (
          <DietItem
            key={index}
            food={item.foodName}
            gram={item.intakeWeight}
            kcal={item.intakeKcal}
          />
        ))}
      </div>
    </div>
  );
};

export default DietContainer;