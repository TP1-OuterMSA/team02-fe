import React from 'react';

const LineButton = ({text, img, onClick}) => {
  return (
      <div>
        <button className="p-2 h-11 rounded-md border border-neutral-200" onClick={onClick}>
          {img? <img className="w-6 h-6" src={img} alt="" /> : {text}}
        </button>
      </div>
  );
};

export default LineButton;