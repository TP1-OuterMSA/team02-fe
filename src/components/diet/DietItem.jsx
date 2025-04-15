import React from 'react';
import {icCloseWhite} from "@assets/index.js";

const DietItem = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between items-center">
        <p>햇반</p>
        <p>100g</p>
      </div>
      <div className="flex justify-between items-center">
        <p>1400kcal</p>
        <img src={icCloseWhite} alt="icon" />
      </div>
    </div>
  );
};

export default DietItem;