import React from 'react';

const AddDietItem = ({foodName, foodWeight, kcal}) => {
  return (
    <div className="px-5 py-3.5 bg-white rounded-xl border border-neutral-200 mt-3 cursor-pointer">
      <p className="text-black text-lg font-bold">{foodName}</p>
      <div className="flex justify-between">
        <p className="text-neutral-400 text-base font-bold">{foodWeight}g</p>
        <p className="text-neutral-400 text-base font-bold">{kcal} kcal</p>
      </div>
    </div>
  );
};

export default AddDietItem;