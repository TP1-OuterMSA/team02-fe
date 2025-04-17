import React from 'react';

const AddDietItem = () => {
  return (
    <div className="px-5 py-3.5 bg-white rounded-xl border border-neutral-200 mt-3 cursor-pointer">
      <p className="text-black text-lg font-bold">현미밥</p>
      <div className="flex justify-between">
        <p className="text-neutral-400 text-base font-bold">1인분(100g)</p>
        <p className="text-neutral-400 text-base font-bold">153kcal</p>
      </div>
    </div>
  );
};

export default AddDietItem;