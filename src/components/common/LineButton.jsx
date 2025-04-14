import React from 'react';

const LineButton = ({children, onClick}) => {
  return (
      <div>
        <button className="p-2 h-11 rounded-md border border-neutral-200 cursor-pointer" onClick={onClick}>
          {children}
        </button>
      </div>
  );
};

export default LineButton;