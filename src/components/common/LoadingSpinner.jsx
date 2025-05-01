import React from 'react';

const LoadingSpinner = ({size = 350, img}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="relative flex items-center justify-center"
        style={{height: `${size}px`, width: `${size}px`}}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="11"
            fill="none"
            className="stroke-zinc-100"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray="45 240"
            strokeDashoffset="100"
            className="origin-center animate-spin border stroke-(--primary)"
          />
        </svg>
        {img && <img src={img} className="absolute w-[40%]" alt="로고"/>}
      </div>
    </div>
  );
};

export default LoadingSpinner;