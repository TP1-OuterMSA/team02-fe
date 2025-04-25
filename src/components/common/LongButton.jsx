import React from 'react';

const LongButton = ({text, onClick}) => {
  return (
    <div className="w-full">
      <button onClick={onClick} className="bg-(--primary) font-bold  text-white cursor-pointer pt-4 pb-4 rounded-lg w-full">
        {text}
      </button>
    </div>
  );
};

export default LongButton;